import {put} from 'redux-saga/effects';

import {updateButtonState, updateRequestsCounters} from '../actions';

/**
 * @param actionType {String}
 * @param disabled {Boolean}
 * @param pendingActions {Array}
 * @param stopActions {Array}
 */
export function getBlockingRequestStatus(actionType, disabled, pendingActions, stopActions) {
    let status = null;

    if (disabled) {
        status = 'DISABLED';
    } else if (pendingActions.includes(actionType)) {
        status = 'PENDING';
    } else if (stopActions.includes(actionType)) {
        status = 'STOPPED';
    }

    return status;
}

/**
 * @param id {String} Service id from config file
 * @param response {Object}
 * @param successCallback {Function|null}
 * @param errorCallback {Function|null}
 */
export function* apiResponseHandler(id, response, successCallback, errorCallback) {
    const {success, error} = response;
    let status = '';
    let failedRequests = '';
    let totalRequests = '';

    if (success) {
        failedRequests = success.failedRequests;
        totalRequests = success.totalRequests;
        status = 'UP';

        yield successCallback && put(successCallback(success));
    } else {
        failedRequests = error.failedRequests;
        totalRequests = error.totalRequests;
        status = 'DOWN';

        yield errorCallback && put(errorCallback(error));
    }

    yield put(updateButtonState({id, status}));
    yield put(updateRequestsCounters({id, failedRequests, totalRequests}));
}
