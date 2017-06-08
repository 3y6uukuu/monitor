import {SERVICES_IDS} from '../../../../../../config';

import {fork, call, put, take, select} from 'redux-saga/effects';

import {
    WORK,
    SLEEP,
    GET_CODE_SUCCESS,
    GET_CODE_FAILURE,
    GET_CODE_DISABLED,

    GET_TOKEN_SUCCESS,
    GET_TOKEN_FAILURE,
    GET_TOKEN_DISABLED,

    getCodeSuccess,
    getCodeFailure,
    getCodeDisabled,

    getTokenSuccess,
    getTokenFailure,
    getTokenDisabled,

    getFreshAccessTokenSuccess,
    getFreshAccessTokenFailure,
    getFreshAccessTokenDisabled,

    updateButtonState,
} from '../../actions';

import {
    getAccessCode as accessCodeFromStore,
    getRefreshToken as refreshTokenFromStore,
} from './selectors';

import {
    getUserId as userIdFromStore,
    getPassword as passwordFromStore,
    getCountry as countryFromStore,
} from '../Header/Customer/Login/selectors';

import {
    getDisabledStatus as disabledStatusFromStore,
} from '../Main/ServiceCheckersTable/ServiceChecker/selectors';

import {
    getAccessCode as getAccessCodeApi,
    getAccessToken as getAccessTokenApi,
    getFreshAccessToken as refreshAccessDataApi,
} from './api';

import {getBlockingRequestStatus, apiResponseHandler} from '../../sagas/helpers'

function* handleGetCode() {
    while (true) {
        const id = SERVICES_IDS.GET_CODE;

        const PENDING_ACTIONS = [];
        const STOP_ACTIONS = [SLEEP];

        const {type} = yield take([id, WORK, ...PENDING_ACTIONS, ...STOP_ACTIONS]);

        const disabled = yield select(disabledStatusFromStore, id);

        const blockingRequestStatus = getBlockingRequestStatus(type, disabled, PENDING_ACTIONS, STOP_ACTIONS);

        if (blockingRequestStatus === null) {
            const country = yield select(countryFromStore);
            const userId = yield select(userIdFromStore);
            const password = yield select(passwordFromStore);

            yield put(updateButtonState({id, status: 'PENDING'}));

            const response = yield call(getAccessCodeApi, {country, userId, password});
            yield apiResponseHandler(id, response, getCodeSuccess, getCodeFailure);
        } else {
            yield put(updateButtonState({id, status: blockingRequestStatus}));

            if (disabled) {
                yield put(getCodeDisabled());
            }
        }
    }
}

function* handleGetToken() {
    while (true) {
        const id = SERVICES_IDS.GET_TOKEN;

        const PENDING_ACTIONS = [SERVICES_IDS.GET_CODE, WORK];
        const STOP_ACTIONS = [SLEEP, GET_CODE_FAILURE, GET_CODE_DISABLED];
        const ACTIONS = [id, GET_CODE_SUCCESS, ...PENDING_ACTIONS, ...STOP_ACTIONS];

        const {type} = yield take(ACTIONS);

        const disabled = yield select(disabledStatusFromStore, id);

        const blockingRequestStatus = getBlockingRequestStatus(type, disabled, PENDING_ACTIONS, STOP_ACTIONS);

        if (blockingRequestStatus === null) {
            const country = yield select(countryFromStore);
            const accessCode = yield select(accessCodeFromStore);

            yield put(updateButtonState({id, status: 'PENDING'}));

            const response = yield call(getAccessTokenApi, {country, accessCode});
            yield apiResponseHandler(id, response, getTokenSuccess, getTokenFailure);
        } else {
            yield put(updateButtonState({id, status: blockingRequestStatus}));

            if (disabled) {
                yield put(getTokenDisabled());
            }
        }
    }
}

function* handleGetFreshToken() {
    while (true) {
        const id = SERVICES_IDS.GET_FRESH_ACCESS_TOKEN;

        const PENDING_ACTIONS = [SERVICES_IDS.GET_CODE, SERVICES_IDS.GET_TOKEN, WORK];
        const STOP_ACTIONS = [SLEEP, GET_CODE_FAILURE, GET_CODE_DISABLED, GET_TOKEN_FAILURE, GET_TOKEN_DISABLED];
        const ACTIONS = [id, GET_TOKEN_SUCCESS, ...PENDING_ACTIONS, ...STOP_ACTIONS];

        const {type} = yield take(ACTIONS);

        const disabled = yield select(disabledStatusFromStore, id);

        const blockingRequestStatus = getBlockingRequestStatus(type, disabled, PENDING_ACTIONS, STOP_ACTIONS);

        if (blockingRequestStatus === null) {
            const country = yield select(countryFromStore);
            const refreshToken = yield select(refreshTokenFromStore);

            yield put(updateButtonState({id, status: 'PENDING'}));

            const response = yield call(refreshAccessDataApi, {country, refreshToken});
            yield apiResponseHandler(id, response, getFreshAccessTokenSuccess, getFreshAccessTokenFailure);
        } else {
            yield put(updateButtonState({id, status: blockingRequestStatus}));

            // TODO: if (!PENDING_ACTIONS.includes(type) && !STOP_ACTIONS.includes(type) && disabled) {
            if (disabled) {
                yield put(getFreshAccessTokenDisabled());
            }
        }
    }
}

export default function* auth() {
    yield fork(handleGetCode);
    yield fork(handleGetToken);
    yield fork(handleGetFreshToken);
}