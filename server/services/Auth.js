const {PEAL_API} = require('../config');
const request = require('request');
const querystring = require('querystring');

function getAccessCode(country, userId, password) {
    const AUTH = PEAL_API[country].AUTH;
    const SHARED_PARAMS = AUTH.SHARED.PARAMS;
    const GET_CODE = AUTH.GET_CODE;
    const PARAMS = GET_CODE.PARAMS;

    const bodyParams = Object.assign(PARAMS.BODY, {password});

    switch (country) {
        case 'CH':
        case 'CH_PROD':
            bodyParams.userId = userId;
            bodyParams.URL = encodeURIComponent(PARAMS.BODY_PARTS.URL + '?' + querystring.stringify(Object.assign(PARAMS.BODY_PARTS.GET, SHARED_PARAMS)));

            break;

        case 'AT':
        case 'AT_PROD':
            bodyParams.username = userId;

            break;

        default:
            throw new Error(`"${country}" – unknown country param`);
    }

    return new Promise((resolve, reject) => {
        let req = request({
            method: 'POST',
            uri: `${GET_CODE.URI}/`,
            body: querystring.stringify(bodyParams),
            jar: true,
            followAllRedirects: true,
        }, (error, response) => {
            function handleResponse(req, response) {
                let statusCode = (response && response.statusCode) || 503;

                try {
                    const matched = req.uri.query && req.uri.query.match(/&code=(.*)/);

                    if (matched) {
                        statusCode = 200;
                        resolve({statusCode, body: {accessCode: matched[1]}});
                    } else {
                        statusCode = 404;
                        reject({statusCode, body: 'Response doesn\'t contain access code'});
                    }
                } catch (error) {
                    reject({statusCode, body: `${error}`});
                }
            }

            switch (country) {
                case 'CH':
                case 'CH_PROD':
                    handleResponse(req, response);

                    break;

                case 'AT':
                case 'AT_PROD':
                    req = request({
                        method: 'GET',
                        uri: PARAMS.CALLBACK.URI + '?' + querystring.stringify(Object.assign(PARAMS.CALLBACK.GET, SHARED_PARAMS)),
                        jar: true
                    }, () => {
                        handleResponse(req, response);
                    });

                    break;

                default:
                    throw new Error(`"${country}" – unknown country param`);
            }
        });
    });
}

// Exchange access code to access token
function getAccessToken(country, code) {
    const AUTH = PEAL_API[country].AUTH;
    const SHARED_PARAMS = AUTH.SHARED.PARAMS;
    const GET_TOKEN = AUTH.GET_TOKEN;
    const PARAMS = GET_TOKEN.PARAMS;

    return new Promise((resolve, reject) => {
        request({
            method: 'POST',
            uri: `${GET_TOKEN.URI}`,
            form: Object.assign(PARAMS, SHARED_PARAMS, {code}),
        }, (error, response, body) => {
            const statusCode = (response && response.statusCode) || 503;

            if (error) {
                reject({statusCode, body: `${error}`});
            } else {
                try {
                    const parsedBody = JSON.parse(body);

                    if (parsedBody.access_token && parsedBody.refresh_token) {
                        resolve({statusCode, body: parsedBody});
                    } else if (parsedBody.error) {
                        reject({statusCode, body: `${parsedBody}`});
                    } else {
                        reject({statusCode, body: '"access_token" or "refresh_token" doesn\'t exist'});
                    }
                } catch (error) {
                    reject({statusCode, body: `${error}`});
                }
            }
        });
    });
}

function getFreshAccessToken(country, refreshToken) {
    const AUTH = PEAL_API[country].AUTH;
    const SHARED_PARAMS = AUTH.SHARED.PARAMS;
    const GET_FRESH_TOKEN = AUTH.GET_FRESH_TOKEN;
    const PARAMS = GET_FRESH_TOKEN.PARAMS;

    return new Promise((resolve, reject) => {
        request({
            method: 'POST',
            uri: `${GET_FRESH_TOKEN.URI}`,
            form: Object.assign(PARAMS, SHARED_PARAMS, {refresh_token: refreshToken}),
        }, (error, response, body) => {
            const statusCode = (response && response.statusCode) || 503;

            if (error) {
                reject({statusCode, body: `${error}`});
            } else {
                try {
                    const parsedBody = JSON.parse(body);

                    if (parsedBody.access_token) {
                        resolve({statusCode, body: parsedBody});
                    } else {
                        reject({statusCode, body: '"access_token" doesn\'t exist'});
                    }
                } catch (error) {
                    reject({statusCode, body: `${error}`});
                }
            }
        });
    });
}

module.exports = {
    getAccessCode,
    getAccessToken,
    getFreshAccessToken,
};
