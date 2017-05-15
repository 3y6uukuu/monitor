const {PEAL_API} = require('../config');
const request = require('request');
const querystring = require('querystring');

function getAccessCode(country, userId, password) {
    const AUTH = PEAL_API[country].AUTH;
    const SHARED_PARAMS = AUTH.SHARED.PARAMS;
    const GET_CODE = AUTH.GET_CODE;
    const PARAMS = GET_CODE.PARAMS;

    const bodyParams = Object.assign(PARAMS.BODY, {password: password});

    if (country.indexOf('CH') > -1) {
        bodyParams.userId = userId;
        bodyParams.URL = encodeURIComponent(PARAMS.BODY_PARTS.URL + '?' + querystring.stringify(Object.assign(PARAMS.BODY_PARTS.GET, SHARED_PARAMS)));
    } else {
        bodyParams.username = userId;
    }

    return new Promise((resolve, reject) => {
        let req = request({
            method: 'POST',
            uri: `${GET_CODE.URI}/`,
            body: querystring.stringify(bodyParams),
            jar: true,
            followAllRedirects: true,
        }, (error, response) => {
            if (country.indexOf('CH') > -1) {
                handleResponse(req, response);
            } else {
                req = request({
                    method: 'GET',
                    uri: PARAMS.CALLBACK.URI + '?' + querystring.stringify(Object.assign(PARAMS.CALLBACK.GET, SHARED_PARAMS)),
                    jar: true
                }, () => {
                    handleResponse(req, response);
                });
            }

            function handleResponse(req, response) {
                const statusCode = (response && response.statusCode) || 503;

                try {
                    const matched = req.uri.query && req.uri.query.match(/en&code=(.*)/);

                    if (matched) {
                        resolve([200, {accessCode: matched[1]}]);
                    } else {
                        reject([404, 'Response doesn\'t contain access code']);
                    }
                } catch (error) {
                    reject([statusCode, `${error}`]);
                }
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
            form: Object.assign(PARAMS, SHARED_PARAMS, {code: code}),
        }, (error, response, body) => {
            const statusCode = (response && response.statusCode) || 503;

            if (error) {
                reject([statusCode, `${error}`]);
            } else {
                try {
                    const parsedBody = JSON.parse(body);

                    if (parsedBody.access_token && parsedBody.refresh_token) {
                        resolve([statusCode, parsedBody]);
                    } else if (parsedBody.error) {
                        reject([statusCode, `${JSON.stringify(parsedBody)}`]);
                    } else {
                        reject([statusCode, '"access_token" or "refresh_token" doesn\'t exist']);
                    }
                } catch (error) {
                    reject([statusCode, `${error}`]);
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
                reject([statusCode, `${error}`]);
            } else {
                try {
                    const parsedBody = JSON.parse(body);

                    if (parsedBody.access_token) {
                        resolve([statusCode, parsedBody]);
                    } else {
                        reject([statusCode, '"access_token" doesn\'t exist']);
                    }
                } catch (error) {
                    reject([statusCode, `${error}`]);
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
