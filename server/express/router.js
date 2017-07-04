const express = require('express');
const router = express.Router();
const nsKeyMirror = require('nskeymirror');

// TODO: make cross apps dependency
const SERVICES_IDS = nsKeyMirror({
    GET_CODE: null,
    GET_TOKEN: null,
    GET_FRESH_ACCESS_TOKEN: null,
    GET_PROFILE: null,
    GET_PRODUCTS: null,
    GET_USAGE: null,
    GET_WIFI_ROAMING_STATUS: null,
    GET_USER_WIFI_CREDENTIALS: null,
    GET_MOBILE_ALLOWANCE: null,
    POST_WIFI_CREDENTIALS: null,
    COMMUNITY_WIFI_OPT_IN: null,
    POST_MOBILE_ALLOWANCE_ROAMING: null,
    POST_MOBILE_ALLOWANCE_SPENDING: null,
}, 'SERVICE');

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

const {getUserWiFiCredentials} = require('../services/SSO');

const Logger = require('../utils/Logger');

const Loggers = {};

async function promiseHandler(payload, response, params, service) {
    const {statusCode, body} = payload;
    const {country} = params;

    if (!country) throw new Error(`country param: "${country}"`);

    if (!Loggers[country]) Loggers[country] = new Logger(country);

    // Write/Read information about requests
    await Loggers[country].write(service, params, statusCode, body);

    const {failedRequests, totalRequests} = await Loggers[country].getRequestsQuantity(service);

    response
        .status(statusCode)
        .json({body, failedRequests, totalRequests});
}

// Auth
router.route('/getAccessCode')
    .post((request, response) => {
        const {body} = request;
        const {country, userId, password} = body;

        return getAccessCode(country, userId, password)
            .then(payload => promiseHandler(payload, response, body, SERVICES_IDS.GET_CODE))
            .catch(payload => promiseHandler(payload, response, body, SERVICES_IDS.GET_CODE));
    });

router.route('/getAccessToken')
    .post((request, response) => {
        const {body} = request;
        const {country, accessCode} = body;

        return getAccessToken(country, accessCode)
            .then(payload => promiseHandler(payload, response, body, SERVICES_IDS.GET_TOKEN))
            .catch(payload => promiseHandler(payload, response, body, SERVICES_IDS.GET_TOKEN));
    });

router.route('/getFreshAccessToken')
    .post((request, response) => {
        const {body} = request;
        const {country, refreshToken} = body;

        return getFreshAccessToken(country, refreshToken)
            .then(payload => promiseHandler(payload, response, body, SERVICES_IDS.GET_FRESH_ACCESS_TOKEN))
            .catch(payload => promiseHandler(payload, response, body, SERVICES_IDS.GET_FRESH_ACCESS_TOKEN));
    });

// Costumer
router.route('/getProfile')
    .get((request, response) => {
        const {query} = request;
        const {country, accessToken} = query;

        return getProfile(country, accessToken)
            .then(payload => promiseHandler(payload, response, query, SERVICES_IDS.GET_PROFILE))
            .catch(payload => promiseHandler(payload, response, query, SERVICES_IDS.GET_PROFILE));
    });

router.route('/getProducts')
    .get((request, response) => {
        const {query} = request;
        const {country, accessToken} = query;

        return getProducts(country, accessToken)
            .then(payload => promiseHandler(payload, response, query, SERVICES_IDS.GET_PRODUCTS))
            .catch(payload => promiseHandler(payload, response, query, SERVICES_IDS.GET_PRODUCTS));
    });

router.route('/getUsage')
    .get((request, response) => {
        const {query} = request;
        const {country, accessToken} = query;

        return getUsage(country, accessToken)
            .then(payload => promiseHandler(payload, response, query, SERVICES_IDS.GET_USAGE))
            .catch(payload => promiseHandler(payload, response, query, SERVICES_IDS.GET_USAGE));
    });

router.route('/getWiFiRoamingStatus')
    .get((request, response) => {
        const {query} = request;
        const {country, accessToken} = query;

        return getWiFiRoamingStatus(country, accessToken)
            .then(payload => promiseHandler(payload, response, query, SERVICES_IDS.GET_WIFI_ROAMING_STATUS))
            .catch(payload => promiseHandler(payload, response, query, SERVICES_IDS.GET_WIFI_ROAMING_STATUS));
    });

router.route('/postWiFiCredentials')
    .post((request, response) => {
        const {body} = request;
        const {country, accessToken, wifiPassword} = body;

        return postWiFiCredentials(country, accessToken, wifiPassword)
            .then(payload => promiseHandler(payload, response, body, SERVICES_IDS.POST_WIFI_CREDENTIALS))
            .catch(payload => promiseHandler(payload, response, body, SERVICES_IDS.POST_WIFI_CREDENTIALS));
    });

router.route('/communityWiFiOptIn')
    .post((request, response) => {
        const {body} = request;
        const {country, accessToken, wifiPassword, userId} = body;

        return communityWiFiOptIn(country, accessToken, wifiPassword, userId)
            .then(payload => promiseHandler(payload, response, body, SERVICES_IDS.COMMUNITY_WIFI_OPT_IN))
            .catch(payload => promiseHandler(payload, response, body, SERVICES_IDS.COMMUNITY_WIFI_OPT_IN));
    });

router.route('/mobileAllowance')
    .get((request, response) => {
        const {query} = request;
        const {country, accessToken} = query;

        return getMobileAllowance(country, accessToken)
            .then(payload => promiseHandler(payload, response, query, SERVICES_IDS.GET_MOBILE_ALLOWANCE))
            .catch(payload => promiseHandler(payload, response, query, SERVICES_IDS.GET_MOBILE_ALLOWANCE));

    })
    .post((request, response) => {
        const {body} = request;
        const {country, accessToken, subscriberId, msisdn, currentAllowance} = body;

        const [allowanceData, ] = currentAllowance;
        const {allowanceType} = allowanceData;

        switch (allowanceType) {
            case 'SPENDING':
                return postMobileAllowance(country, accessToken, subscriberId, msisdn, currentAllowance)
                    .then(payload => promiseHandler(payload, response, body, SERVICES_IDS.POST_MOBILE_ALLOWANCE_SPENDING))
                    .catch(payload => promiseHandler(payload, response, body, SERVICES_IDS.POST_MOBILE_ALLOWANCE_SPENDING));

            case 'ROAMING':
                return postMobileAllowance(country, accessToken, subscriberId, msisdn, currentAllowance)
                    .then(payload => promiseHandler(payload, response, body, SERVICES_IDS.POST_MOBILE_ALLOWANCE_ROAMING))
                    .catch(payload => promiseHandler(payload, response, body, SERVICES_IDS.POST_MOBILE_ALLOWANCE_ROAMING));

            default:
                throw new Error(`"${allowanceType}" – unknown allowanceType param`);
        }
    });

router.route('/getUserWiFiCredentials')
    .get((request, response) => {
        const {query} = request;
        const {country, accessToken} = query;

        return getUserWiFiCredentials(country, accessToken)
            .then(payload => promiseHandler(payload, response, query, SERVICES_IDS.GET_USER_WIFI_CREDENTIALS))
            .catch(payload => promiseHandler(payload, response, query, SERVICES_IDS.GET_USER_WIFI_CREDENTIALS));
    });

router.route('/logger/getFailedRequests')
    .get((request, response) => {
        const {query} = request;
        const {country, serviceId} = query;

        if (!country) throw new Error(`country param: "${country}"`);
        if (!serviceId) throw new Error(`serviceId param: "${serviceId}"`);

        if (Loggers[country]) {
            Loggers[country].getRequests(serviceId, {failed: true})
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
        } else {
            response
                .status(200)
                .json({requests: []});
        }
    });

module.exports = router;