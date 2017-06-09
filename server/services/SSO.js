const {PEAL_API, PEAL_TIMEOUT} = require('../config');
const request = require('request');
const {isDown} = require('../utils/responseChecker');

function getUserWiFiCredentials(country, token) {
    const SSO = PEAL_API[country].SSO;

    return new Promise((resolve, reject) => {
        request({
            method: 'GET',
            uri: SSO.URI,
            qs: SSO.PARAMS,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            timeout: PEAL_TIMEOUT,
        }, (error, response, body) => {
            const statusCode = (response && response.statusCode) || 503;

            if (error) {
                reject({statusCode, body: `${error}`});
            } else if (isDown(statusCode)) {
                reject({statusCode, body: `${body}`});
            } else {
                try {
                    const parsedBody = JSON.parse(body);

                    resolve({statusCode, body: parsedBody});
                } catch (parseError) {
                    reject({statusCode, body: `${parseError}`});
                }
            }
        });
    });
}

module.exports = {
    getUserWiFiCredentials,
};