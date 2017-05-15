/* eslint-disable no-unused-vars */
const express = require('express');
const router = express.Router();

const {
    getAccessCode,
    getAccessToken,
    getFreshAccessToken,
} = require('../services/Auth');

const {
    getProfile,
    getProducts,
    getUsage,
    getWiFiRoamingStatus,
    postWiFiCredentials,
    communityWiFiOptIn,
    getMobileAllowance,
    postMobileAllowance,
} = require('../services/Customers');

const {
    getUserWiFiCredentials,
} = require('../services/SSO');

const Logger = require('../utils/Logger');

let Loggers = {};

async function promiseHandler(payload, response, params, service) {
    const [statusCode, ] = payload;
    let [, parsedBody] = payload;

    const {country} = params;
    if (!country) throw new Error(`Country param: "${country}" – wasn't received`);

    if (!Loggers[country]) {
        Loggers[country] = new Logger(country);
    }

    // Write/Read information about requests
    await Loggers[country].write(service, params, statusCode, parsedBody);

    const {failedRequests, totalRequests} = await Loggers[country].getRequestsQuantity(service);

    response
        .status(statusCode)
        .json({body: parsedBody, failedRequests, totalRequests});
}

// Auth
router.route('/getAccessCode')
    .post((request, response) => {
        const {body} = request;
        const {country, userId, password} = body;

        return getAccessCode(country, userId, password)
            .then(payload => promiseHandler(payload, response, body, 'getAccessCode'))
            .catch(payload => promiseHandler(payload, response, body, 'getAccessCode'));
    });

router.route('/getAccessToken')
    .post((request, response) => {
        const {body} = request;
        const {country, accessCode} = body;

        return getAccessToken(country, accessCode)
            .then(payload => promiseHandler(payload, response, body, 'getAccessToken'))
            .catch(payload => promiseHandler(payload, response, body, 'getAccessToken'));
    });

router.route('/getFreshAccessToken')
    .post((request, response) => {
        const {body} = request;
        const {country, refreshToken} = body;

        return getFreshAccessToken(country, refreshToken)
            .then(payload => promiseHandler(payload, response, body, 'getFreshAccessToken'))
            .catch(payload => promiseHandler(payload, response, body, 'getFreshAccessToken'));
    });

// Costumer
router.route('/getProfile')
    .get((request, response) => {
        const {query} = request;
        const {country, accessToken} = query;

        return getProfile(country, accessToken)
            .then(payload => promiseHandler(payload, response, query, 'getProfile'))
            .catch(payload => promiseHandler(payload, response, query, 'getProfile'));
    });

router.route('/getProducts')
    .get((request, response) => {
        const {query} = request;
        const {country, accessToken} = query;

        return getProducts(country, accessToken)
            .then(payload => promiseHandler(payload, response, query, 'getProducts'))
            .catch(payload => promiseHandler(payload, response, query, 'getProducts'));
    });

router.route('/getUsage')
    .get((request, response) => {
        const {query} = request;
        const {country, accessToken} = query;

        return getUsage(country, accessToken)
            .then(payload => promiseHandler(payload, response, query, 'getUsage'))
            .catch(payload => promiseHandler(payload, response, query, 'getUsage'));
    });

router.route('/getWiFiRoamingStatus')
    .get((request, response) => {
        const {query} = request;
        const {country, accessToken} = query;

        return getWiFiRoamingStatus(country, accessToken)
            .then(payload => promiseHandler(payload, response, query, 'getWiFiRoamingStatus'))
            .catch(payload => promiseHandler(payload, response, query, 'getWiFiRoamingStatus'));
    });

router.route('/postWiFiCredentials')
    .post((request, response) => {
        const {body} = request;
        const {country, accessToken, wifiPassword} = body;

        return postWiFiCredentials(country, accessToken, wifiPassword)
            .then(payload => promiseHandler(payload, response, body, 'postWiFiCredentials'))
            .catch(payload => promiseHandler(payload, response, body, 'postWiFiCredentials'));
    });

router.route('/communityWiFiOptIn')
    .post((request, response) => {
        const {body} = request;
        const {country, accessToken, wifiPassword, userId} = body;

        return communityWiFiOptIn(country, accessToken, wifiPassword, userId)
            .then(payload => promiseHandler(payload, response, body, 'communityWiFiOptIn'))
            .catch(payload => promiseHandler(payload, response, body, 'communityWiFiOptIn'));
    });

router.route('/mobileAllowance')
    .get((request, response) => {
        const {query} = request;
        const {country, accessToken} = query;

        return getMobileAllowance(country, accessToken)
            .then(payload => promiseHandler(payload, response, query, 'getMobileAllowance'))
            .catch(payload => promiseHandler(payload, response, query, 'getMobileAllowance'));

    })
    .post((request, response) => {
        const {body} = request;
        const {country, accessToken, subscriberId, msisdn, currentAllowance} = body;

        const [allowanceData, ] = currentAllowance;

        switch (allowanceData.allowanceType) {
            case 'SPENDING':
                return postMobileAllowance(country, accessToken, subscriberId, msisdn, currentAllowance)
                    .then(payload => promiseHandler(payload, response, body, 'postMobileAllowanceSpending'))
                    .catch(payload => promiseHandler(payload, response, body, 'postMobileAllowanceSpending'));

            case 'ROAMING':
                return postMobileAllowance(country, accessToken, subscriberId, msisdn, currentAllowance)
                    .then(payload => promiseHandler(payload, response, body, 'postMobileAllowanceRoaming'))
                    .catch(payload => promiseHandler(payload, response, body, 'postMobileAllowanceRoaming'));
        }
    });

router.route('/getUserWiFiCredentials')
    .get((request, response) => {
        const {query} = request;
        const {country, accessToken} = query;

        return getUserWiFiCredentials(country, accessToken)
            .then(payload => promiseHandler(payload, response, query, 'getUserWiFiCredentials'))
            .catch(payload => promiseHandler(payload, response, query, 'getUserWiFiCredentials'));
    });

router.route('/logger/getRequests')
    .get((request, response) => {
        const {country} = request;
        if (!country) throw new Error(`Country param: "${country}" – wasn't received`);

        if (!Loggers[country]) {
            Loggers[country] = new Logger(country);
        }

        Loggers[country].getRequests()
            .then(payload => {
                response
                    .status(response.statusCode)
                    .json({requests: payload});
            })
            .catch(payload => {
                const {message} = payload;

                response
                    .status(500)
                    .json({message});
            });
    });

module.exports = router;