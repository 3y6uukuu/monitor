import {SERVICES_IDS} from '../../../../../../../../config';
import {fork, call, put, take, select} from 'redux-saga/effects';

import {
    WORK,
    SLEEP,
    GET_CODE_FAILURE,
    GET_CODE_DISABLED,

    GET_TOKEN_FAILURE,
    GET_TOKEN_DISABLED,

    GET_FRESH_ACCESS_TOKEN_SUCCESS,
    GET_FRESH_ACCESS_TOKEN_FAILURE,
    GET_FRESH_ACCESS_TOKEN_DISABLED,

    GET_MOBILE_ALLOWANCE_SUCCESS,
    GET_MOBILE_ALLOWANCE_FAILURE,
    GET_MOBILE_ALLOWANCE_DISABLED,

    updateButtonState,

    getMobileAllowanceSuccess,
    getMobileAllowanceFailure,
    getMobileAllowanceDisabled,
} from '../../../../actions';

import {
    getUserId as userIdFromStore,
    getCountry as countryFromStore,
} from '../../../Header/Customer/Login/selectors';

import {
    getAccessToken as accessTokenFromStore,
} from '../../../Auth/selectors';

import {
    getDisabledStatus as disabledStatusFromStore,
    getParams as paramsFromStore,
} from './selectors';

import {
    getProfile,
    getProducts,
    getUsage,
    getWiFiRoamingStatus,
    getUserWiFiCredentials,
    getMobileAllowance,
    postWiFiCredentials,
    communityWiFiOptIn,
    postMobileAllowance,
} from './api';

import {getBlockingRequestStatus, apiResponseHandler} from '../../../../sagas/helpers';

const COMMON_ACTIONS = [
    GET_FRESH_ACCESS_TOKEN_SUCCESS,
    GET_FRESH_ACCESS_TOKEN_FAILURE,
    GET_FRESH_ACCESS_TOKEN_DISABLED,
];

const STOP_ACTIONS = [
    SLEEP,

    GET_CODE_FAILURE,
    GET_CODE_DISABLED,

    GET_TOKEN_FAILURE,
    GET_TOKEN_DISABLED,
];

const PENDING_ACTIONS = [
    WORK,

    SERVICES_IDS.GET_CODE,

    SERVICES_IDS.GET_TOKEN,
    SERVICES_IDS.GET_FRESH_ACCESS_TOKEN,
];

function* handleGetProfile() {
    while (true) {
        const id = SERVICES_IDS.GET_PROFILE;

        const {type} = yield take([id, ...COMMON_ACTIONS, ...PENDING_ACTIONS, ...STOP_ACTIONS]);

        const disabled = yield select(disabledStatusFromStore, id);

        const blockingRequestStatus = getBlockingRequestStatus(type, disabled, PENDING_ACTIONS, STOP_ACTIONS);

        if (blockingRequestStatus === null) {
            const country = yield select(countryFromStore);
            const accessToken = yield select(accessTokenFromStore);

            yield put(updateButtonState({id, status: 'PENDING'}));

            const response = yield call(getProfile, {country, accessToken});
            yield apiResponseHandler(id, response, null, null);
        } else {
            yield put(updateButtonState({id, status: blockingRequestStatus}));
        }
    }
}

function* handleGetProducts() {
    while (true) {
        const id = SERVICES_IDS.GET_PRODUCTS;

        const {type} = yield take([id, ...COMMON_ACTIONS, ...PENDING_ACTIONS, ...STOP_ACTIONS]);

        const disabled = yield select(disabledStatusFromStore, id);

        const blockingRequestStatus = getBlockingRequestStatus(type, disabled, PENDING_ACTIONS, STOP_ACTIONS);

        if (blockingRequestStatus === null) {
            const country = yield select(countryFromStore);
            const accessToken = yield select(accessTokenFromStore);

            yield put(updateButtonState({id, status: 'PENDING'}));

            const response = yield call(getProducts, {country, accessToken});
            yield apiResponseHandler(id, response, null, null);
        } else {
            yield put(updateButtonState({id, status: blockingRequestStatus}));
        }
    }
}

function* handleGetUsage() {
    while (true) {
        const id = SERVICES_IDS.GET_USAGE;

        const {type} = yield take([id, ...COMMON_ACTIONS, ...PENDING_ACTIONS, ...STOP_ACTIONS]);

        const disabled = yield select(disabledStatusFromStore, id);

        const blockingRequestStatus = getBlockingRequestStatus(type, disabled, PENDING_ACTIONS, STOP_ACTIONS);

        if (blockingRequestStatus === null) {
            const country = yield select(countryFromStore);
            const accessToken = yield select(accessTokenFromStore);

            yield put(updateButtonState({id, status: 'PENDING'}));
            const response = yield call(getUsage, {country, accessToken});

            yield apiResponseHandler(id, response, null, null);
        } else {
            yield put(updateButtonState({id, status: blockingRequestStatus}));
        }
    }
}

function* handleGetWiFiRoamingStatus() {
    while (true) {
        const id = SERVICES_IDS.GET_WIFI_ROAMING_STATUS;

        const {type} = yield take([id, ...COMMON_ACTIONS, ...PENDING_ACTIONS, ...STOP_ACTIONS]);

        const disabled = yield select(disabledStatusFromStore, id);

        const blockingRequestStatus = getBlockingRequestStatus(type, disabled, PENDING_ACTIONS, STOP_ACTIONS);

        if (blockingRequestStatus === null) {
            const country = yield select(countryFromStore);
            const accessToken = yield select(accessTokenFromStore);

            yield put(updateButtonState({id, status: 'PENDING'}));
            const response = yield call(getWiFiRoamingStatus, {country, accessToken});

            yield apiResponseHandler(id, response, null, null);
        } else {
            yield put(updateButtonState({id, status: blockingRequestStatus}));
        }
    }
}

function* handleGetUserWiFiData() {
    while (true) {
        const id = SERVICES_IDS.GET_USER_WIFI_CREDENTIALS;

        const {type} = yield take([id, ...COMMON_ACTIONS, ...PENDING_ACTIONS, ...STOP_ACTIONS]);

        const disabled = yield select(disabledStatusFromStore, id);

        const blockingRequestStatus = getBlockingRequestStatus(type, disabled, PENDING_ACTIONS, STOP_ACTIONS);

        if (blockingRequestStatus === null) {
            const country = yield select(countryFromStore);
            const accessToken = yield select(accessTokenFromStore);

            yield put(updateButtonState({id, status: 'PENDING'}));
            const response = yield call(getUserWiFiCredentials, {country, accessToken});

            yield apiResponseHandler(id, response, null, null);
        } else {
            yield put(updateButtonState({id, status: blockingRequestStatus}));
        }
    }
}

function* handlePostWiFiCredentials() {
    while (true) {
        const id = SERVICES_IDS.POST_WIFI_CREDENTIALS;

        const {type} = yield take([id, ...COMMON_ACTIONS, ...PENDING_ACTIONS, ...STOP_ACTIONS]);

        const disabled = yield select(disabledStatusFromStore, id);

        const blockingRequestStatus = getBlockingRequestStatus(type, disabled, PENDING_ACTIONS, STOP_ACTIONS);

        if (blockingRequestStatus === null) {
            const country = yield select(countryFromStore);
            const accessToken = yield select(accessTokenFromStore);

            yield put(updateButtonState({id, status: 'PENDING'}));

            const params = yield select(paramsFromStore, id);
            const response = yield call(postWiFiCredentials, {country, accessToken, ...params});

            yield apiResponseHandler(id, response, null, null);
        } else {
            yield put(updateButtonState({id, status: blockingRequestStatus}));
        }
    }
}

function* handlePostNewWiFiCredentials() {
    while (true) {
        const id = SERVICES_IDS.COMMUNITY_WIFI_OPT_IN;

        const {type} = yield take([id, ...COMMON_ACTIONS, ...PENDING_ACTIONS, ...STOP_ACTIONS]);

        const disabled = yield select(disabledStatusFromStore, id);

        const blockingRequestStatus = getBlockingRequestStatus(type, disabled, PENDING_ACTIONS, STOP_ACTIONS);

        if (blockingRequestStatus === null) {
            const country = yield select(countryFromStore);
            const userId = yield select(userIdFromStore);
            const accessToken = yield select(accessTokenFromStore);

            yield put(updateButtonState({id, status: 'PENDING'}));

            const params = yield select(paramsFromStore, id);

            const response = yield call(communityWiFiOptIn, {userId, country, accessToken, ...params});

            yield apiResponseHandler(id, response, null, null);
        } else {
            yield put(updateButtonState({id, status: blockingRequestStatus}));
        }
    }
}

function* handleGetMobileAllowance() {
    while (true) {
        const id = SERVICES_IDS.GET_MOBILE_ALLOWANCE;

        const {type} = yield take([id, ...COMMON_ACTIONS, ...PENDING_ACTIONS, ...STOP_ACTIONS]);

        const disabled = yield select(disabledStatusFromStore, id);

        const blockingRequestStatus = getBlockingRequestStatus(type, disabled, PENDING_ACTIONS, STOP_ACTIONS);

        if (blockingRequestStatus === null) {
            const country = yield select(countryFromStore);
            const accessToken = yield select(accessTokenFromStore);

            yield put(updateButtonState({id, status: 'PENDING'}));
            const response = yield call(getMobileAllowance, {country, accessToken});

            yield apiResponseHandler(id, response, getMobileAllowanceSuccess, getMobileAllowanceFailure);
        } else {
            yield put(updateButtonState({id, status: blockingRequestStatus}));

            if (disabled) {
                yield put(getMobileAllowanceDisabled());
            }
        }
    }
}

function* handlePostMobileAllowanceRoaming() {
    while (true) {
        const id = SERVICES_IDS.POST_MOBILE_ALLOWANCE_ROAMING;

        const commonActions = [GET_MOBILE_ALLOWANCE_SUCCESS]; //, ...COMMON_ACTIONS
        const pendingActions = [SERVICES_IDS.GET_MOBILE_ALLOWANCE, ...PENDING_ACTIONS];
        const stopActions = [GET_MOBILE_ALLOWANCE_FAILURE, GET_MOBILE_ALLOWANCE_DISABLED, ...STOP_ACTIONS];

        const {type} = yield take([id, ...commonActions, ...pendingActions, ...stopActions]);

        const disabled = yield select(disabledStatusFromStore, id);
        
        const blockingRequestStatus = getBlockingRequestStatus(type, disabled, pendingActions, stopActions);

        if (blockingRequestStatus === null) {
            const country = yield select(countryFromStore);
            const accessToken = yield select(accessTokenFromStore);

            yield put(updateButtonState({id, status: 'PENDING'}));

            const params = yield select(paramsFromStore, id);
            const response = yield call(postMobileAllowance, {country, accessToken, ...params});

            yield apiResponseHandler(id, response, null, null);
        } else {
            yield put(updateButtonState({id, status: blockingRequestStatus}));
        }
    }
}

function* handlePostMobileAllowanceSpending() {
    while (true) {
        const id = SERVICES_IDS.POST_MOBILE_ALLOWANCE_SPENDING;

        const commonActions = [GET_MOBILE_ALLOWANCE_SUCCESS]; //, ...COMMON_ACTIONS
        const pendingActions = [SERVICES_IDS.GET_MOBILE_ALLOWANCE, ...PENDING_ACTIONS];
        const stopActions = [GET_MOBILE_ALLOWANCE_FAILURE, GET_MOBILE_ALLOWANCE_DISABLED, ...STOP_ACTIONS];

        const {type} = yield take([id, ...commonActions, ...pendingActions, ...stopActions]);

        const disabled = yield select(disabledStatusFromStore, id);

        const blockingRequestStatus = getBlockingRequestStatus(type, disabled, pendingActions, stopActions);

        if (blockingRequestStatus === null) {
            const country = yield select(countryFromStore);
            const accessToken = yield select(accessTokenFromStore);

            yield put(updateButtonState({id, status: 'PENDING'}));

            const params = yield select(paramsFromStore, id);
            const response = yield call(postMobileAllowance, {country, accessToken, ...params});

            yield apiResponseHandler(id, response, null, null);
        } else {
            yield put(updateButtonState({id, status: blockingRequestStatus}));
        }
    }
}

export default function* customer() {
    yield fork(handleGetProfile);
    yield fork(handleGetProducts);
    yield fork(handleGetUsage);
    yield fork(handleGetWiFiRoamingStatus);
    yield fork(handleGetUserWiFiData);
    yield fork(handleGetMobileAllowance);

    yield fork(handlePostWiFiCredentials);
    yield fork(handlePostNewWiFiCredentials);
    yield fork(handlePostMobileAllowanceRoaming);
    yield fork(handlePostMobileAllowanceSpending);
}