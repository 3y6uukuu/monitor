const {PEAL_API, PEAL_TIMEOUT} = require('../config');
const request = require('request');
const {isDown} = require('../utils/responseChecker');

function getProfile(country, token) {
    const CUSTOMERS = PEAL_API[country].CUSTOMERS;

    return new Promise((resolve, reject) => {
        request({
            method: 'GET',
            uri: `${CUSTOMERS.SHARED.URI}/CUSTOMERID/profile`,
            qs: CUSTOMERS.SHARED.PARAMS,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            timeout: PEAL_TIMEOUT,
        }, (error, response, body) => {
            const statusCode = (response && response.statusCode) || 503;

            if (error) {
                reject([statusCode, `${error}`]);
            } else if (isDown(statusCode)) {
                reject([statusCode, `${body}`]);
            } else {
                try {
                    const parsedBody = JSON.parse(body);

                    if (parsedBody.customerNumber) {
                        resolve([statusCode, parsedBody]);
                    } else {
                        reject([statusCode, '"customerNumber" doesn\'t exist']);
                    }
                } catch (parseError) {
                    reject([statusCode, `${parseError}`]);
                }
            }
        });
    });
}

function getProducts(country, token) {
    const CUSTOMERS = PEAL_API[country].CUSTOMERS;

    return new Promise((resolve, reject) => {
        request({
            method: 'GET',
            uri: `${CUSTOMERS.SHARED.URI}/CUSTOMERID/products`,
            qs: CUSTOMERS.SHARED.PARAMS,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            timeout: PEAL_TIMEOUT,
        }, (error, response, body) => {
            const statusCode = (response && response.statusCode) || 503;

            if (error) {
                reject([statusCode, `${error}`]);
            } else if (isDown(statusCode)) {
                reject([statusCode, `${body}`]);
            } else {
                try {
                    const parsedBody = JSON.parse(body);

                    resolve([statusCode, parsedBody]);
                } catch (parseError) {
                    reject([statusCode, `${parseError}`]);
                }
            }
        });
    });
}

function getUsage(country, token) {
    const CUSTOMERS = PEAL_API[country].CUSTOMERS;

    return new Promise((resolve, reject) => {
        request({
            method: 'GET',
            uri: `${CUSTOMERS.SHARED.URI}/CUSTOMERID/usage`,
            qs: Object.assign(CUSTOMERS.USAGE.PARAMS, CUSTOMERS.SHARED.PARAMS),
            headers: {
                'Authorization': `Bearer ${token}`
            },
            timeout: PEAL_TIMEOUT,
        }, (error, response, body) => {
            const statusCode = (response && response.statusCode) || 503;

            if (error) {
                reject([statusCode, `${error}`]);
            } else if (isDown(statusCode)) {
                reject([statusCode, `${body}`]);
            } else {
                try {
                    const parsedBody = JSON.parse(body);

                    resolve([statusCode, parsedBody]);
                } catch (parseError) {
                    reject([statusCode, `${parseError}`]);
                }
            }
        });
    });
}

function getWiFiRoamingStatus(country, token) {
    const CUSTOMERS = PEAL_API[country].CUSTOMERS;

    return new Promise((resolve, reject) => {
        request({
            method: 'GET',
            uri: `${CUSTOMERS.SHARED.URI}/CUSTOMERID/wifi/roamingStatus`,
            qs: CUSTOMERS.SHARED.PARAMS,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            timeout: PEAL_TIMEOUT,
        }, (error, response, body) => {
            const statusCode = (response && response.statusCode) || 503;

            if (error) {
                reject([statusCode, `${error}`]);
            } else if (isDown(statusCode)) {
                reject([statusCode, `${body}`]);
            } else {
                try {
                    const parsedBody = JSON.parse(body);

                    resolve([statusCode, parsedBody]);
                } catch (parseError) {
                    reject([statusCode, `${parseError}`]);
                }
            }
        });
    });
}

function postWiFiCredentials(country, token, wifiPassword) {
    const CUSTOMERS = PEAL_API[country].CUSTOMERS;

    return new Promise((resolve, reject) => {
        request({
            method: 'POST',
            uri: `${CUSTOMERS.SHARED.URI}/CUSTOMERID/wifi/credentials`,
            qs: CUSTOMERS.SHARED.PARAMS,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            json: {
                'wifiPassword': `${wifiPassword}`
            },
            timeout: PEAL_TIMEOUT,
        }, (error, response, body) => {
            const statusCode = (response && response.statusCode) || 503;

            if (error) {
                reject([statusCode, `${error}`]);
            } else if (isDown(statusCode)) {
                reject([statusCode, `${body}`]);
            } else {
                if (body === '202:Submitted') {
                    resolve([statusCode, {body}]);
                } else {
                    reject([statusCode, 'body !== "202:Submitted"']);
                }
            }
        });
    });
}

function communityWiFiOptIn(country, token, wifiPassword, userId) {
    const CUSTOMERS = PEAL_API[country].CUSTOMERS;

    return new Promise((resolve, reject) => {
        request({
            method: 'POST',
            uri: `${CUSTOMERS.SHARED.URI}/CUSTOMERID/wifi`,
            qs: Object.assign(CUSTOMERS.WIFI_DATA.PARAMS, CUSTOMERS.SHARED.PARAMS),
            headers: {
                'Authorization': `Bearer ${token}`
            },
            json: {
                'wifiPassword': `${wifiPassword}`,
                'userId': `${userId}`
            },
            timeout: PEAL_TIMEOUT,
        }, (error, response, body) => {
            const statusCode = (response && response.statusCode) || 503;

            if (error) {
                reject([statusCode, `${error}`]);
            } else if (isDown(statusCode)) {
                reject([statusCode, `${body}`]);
            } else {
                if (body === '202:Submitted') {
                    resolve([statusCode, {body}]);
                } else {
                    reject([statusCode, 'body !== "202:Submitted"']);
                }
            }
        });
    });
}

function getMobileAllowance(country, token) {
    const CUSTOMERS = PEAL_API[country].CUSTOMERS;

    return new Promise((resolve, reject) => {
        request({
            method: 'GET',
            uri: `${CUSTOMERS.SHARED.URI}/CUSTOMERID/mobileallowance`,
            qs: CUSTOMERS.SHARED.PARAMS,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            timeout: PEAL_TIMEOUT,
        }, (error, response, body) => {
            const statusCode = (response && response.statusCode) || 503;

            if (error) {
                reject([statusCode, `${error}`]);
            } else if (isDown(statusCode)) {
                reject([statusCode, `${body}`]);
            } else {
                try {
                    const parsedBody = JSON.parse(body);

                    resolve([statusCode, parsedBody]);
                } catch (parseError) {
                    reject([statusCode, `${parseError}`]);
                }
            }
        });
    });
}

function postMobileAllowance(country, token, subscriberId, msisdn, currentAllowance) {
    const CUSTOMERS = PEAL_API[country].CUSTOMERS;

    return new Promise((resolve, reject) => {
        request({
            method: 'POST',
            uri: `${CUSTOMERS.SHARED.URI}/CUSTOMERID/mobileallowance`,
            qs: CUSTOMERS.SHARED.PARAMS,
            json: {
                'subscriberId': subscriberId,
                'msisdn': msisdn,
                'currentAllowance': currentAllowance
            },
            headers: {
                'Authorization': `Bearer ${token}`
            },
            timeout: PEAL_TIMEOUT,
        }, (error, response, body) => {
            const statusCode = (response && response.statusCode) || 503;

            if (error) {
                reject([statusCode, `${error}`]);
            } else if (isDown(statusCode)) {
                reject([statusCode, `${body}`]);
            } else {
                if (body === 'Success') {
                    resolve([statusCode, {body}]);
                } else {
                    reject([statusCode, 'body !== "Success"']);
                }
            }
        });
    });
}

module.exports = {
    getProfile,
    getProducts,
    getUsage,
    getWiFiRoamingStatus,
    postWiFiCredentials,
    communityWiFiOptIn,
    getMobileAllowance,
    postMobileAllowance
};