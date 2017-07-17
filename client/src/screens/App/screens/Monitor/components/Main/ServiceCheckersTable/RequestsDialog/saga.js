import {fork, call, put, take, select} from 'redux-saga/effects';

import {
    OPEN_REQUESTS_DIALOG,
    updateRequestsList,
} from '../../../../actions';

import {
    getCountry as countryFromStore,
} from '../../../Header/Customer/Login/selectors';

import {
    getFailedRequests as getFailedRequestsApi,
} from './api';

function* handleGetRequests() {
    while (true) {
        const {payload} = yield take(OPEN_REQUESTS_DIALOG);
        const country = yield select(countryFromStore);

        const {serviceId} = payload;

        const {success} = yield call(getFailedRequestsApi, {country, serviceId});
        const {requests} = success;

        yield put(updateRequestsList({serviceId, requests}));
    }
}

export default function* requestsDialog() {
    yield fork(handleGetRequests);
}