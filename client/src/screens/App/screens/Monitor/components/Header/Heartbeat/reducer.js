import {Map} from 'immutable';

import {
    WORK,
    SLEEP,
    GET_CODE_SUCCESS,
    GET_CODE_FAILURE,
    GET_CODE_DISABLED,

    GET_TOKEN_SUCCESS,
    GET_TOKEN_FAILURE,
    GET_TOKEN_DISABLED,
} from '../../../actions';

const initial = Map({
    heartbeat: Map({
        state: 'pulsar',
    }),
});


const updateState = (state, payload) => state.set('state', payload);

function heartbeat(state = initial.get('heartbeat'), {type}) {
    switch (type) {
        case WORK:
        case GET_CODE_SUCCESS:
        case GET_TOKEN_SUCCESS:
            return updateState(state, 'jugular');

        case SLEEP:
        case GET_CODE_FAILURE:
        case GET_CODE_DISABLED:
        case GET_TOKEN_FAILURE:
        case GET_TOKEN_DISABLED:
            return updateState(state, 'flat');

        default:
            return state;
    }
}

export default heartbeat;
