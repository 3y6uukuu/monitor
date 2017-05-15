import {createAction} from 'redux-actions';

// Customer
export const LOG_IN = 'LOG_IN';
export const logIn = createAction(LOG_IN);

// Auth
export const GET_CODE_SUCCESS = 'GET_CODE_SUCCESS';
export const GET_CODE_FAILURE = 'GET_CODE_FAILURE';
export const GET_CODE_DISABLED = 'GET_CODE_DISABLED';

export const getCodeSuccess = createAction(GET_CODE_SUCCESS);
export const getCodeFailure = createAction(GET_CODE_FAILURE);
export const getCodeDisabled = createAction(GET_CODE_DISABLED);


export const GET_TOKEN_SUCCESS = 'GET_TOKEN_SUCCESS';
export const GET_TOKEN_FAILURE = 'GET_TOKEN_FAILURE';
export const GET_TOKEN_DISABLED = 'GET_TOKEN_DISABLED';

export const getTokenSuccess = createAction(GET_TOKEN_SUCCESS);
export const getTokenFailure = createAction(GET_TOKEN_FAILURE);
export const getTokenDisabled = createAction(GET_TOKEN_DISABLED);


export const GET_FRESH_ACCESS_TOKEN_SUCCESS = 'GET_FRESH_ACCESS_TOKEN_SUCCESS';
export const GET_FRESH_ACCESS_TOKEN_FAILURE = 'GET_FRESH_ACCESS_TOKEN_FAILURE';
export const GET_FRESH_ACCESS_TOKEN_DISABLED = 'GET_FRESH_ACCESS_TOKEN_DISABLED';

export const getFreshAccessTokenSuccess = createAction(GET_FRESH_ACCESS_TOKEN_SUCCESS);
export const getFreshAccessTokenFailure = createAction(GET_FRESH_ACCESS_TOKEN_FAILURE);
export const getFreshAccessTokenDisabled = createAction(GET_FRESH_ACCESS_TOKEN_DISABLED);


// ServiceCheckers
export const UPDATE_BUTTON_STATE = 'UPDATE_BUTTON_STATE';
export const UPDATE_REQUESTS_COUNTERS = 'UPDATE_REQUESTS_COUNTERS';
export const DISABLE_SERVICE = 'DISABLE_SERVICE';

export const updateButtonState = createAction(UPDATE_BUTTON_STATE);
export const updateRequestsCounters = createAction(UPDATE_REQUESTS_COUNTERS);
export const disableService = createAction(DISABLE_SERVICE);


// Timer
export const WORK = 'WORK';
export const SLEEP = 'SLEEP';

export const work = createAction(WORK);
export const sleep = createAction(SLEEP);
