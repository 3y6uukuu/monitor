import {Map} from 'immutable';

import {
    GET_CODE_SUCCESS, GET_CODE_FAILURE,
    GET_TOKEN_SUCCESS, GET_TOKEN_FAILURE,
    GET_FRESH_ACCESS_TOKEN_SUCCESS,
} from '../../actions';

const initial = Map({
    auth: Map({
        accessCode: null,
        accessToken: null,
        refreshToken: null,
    }),
});

function updateTokensState(state, payload) {
    let tokenState = {
        accessToken: null,
        refreshToken: null,
    };

    if (payload) {
        tokenState = {
            accessToken: payload.body.access_token,
            refreshToken: payload.body.refresh_token,
        }
    }

    return state.merge(Map(tokenState));
}

function auth(state = initial.get('auth'), {type, payload}) {
    switch (type) {
        case GET_CODE_SUCCESS:
            return state.set('accessCode', payload.body.accessCode);

        case GET_CODE_FAILURE:
            return state.set('accessCode', null);

        case GET_TOKEN_SUCCESS:
            return updateTokensState(state, payload);

        case GET_TOKEN_FAILURE:
            return updateTokensState(state, null);

        case GET_FRESH_ACCESS_TOKEN_SUCCESS:
            return updateTokensState(state, payload);

        default:
            return state;
    }
}

export default auth;
