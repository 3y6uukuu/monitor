import {Map, List} from 'immutable';
import {
    OPEN_REQUESTS_DIALOG,
    CLOSE_REQUESTS_DIALOG,
    UPDATE_REQUESTS_LIST,
} from '../../../../actions';


const initial = Map({
    requestsDialog: Map({
        isOpen: false,
        serviceId: '',
        requests: List([]),
    }),
});

function updateRequestsList(state, payload) {
    const {serviceId, requests} = payload;

    return state
        .set('serviceId', serviceId)
        .set('requests', requests);
}

const updateDisplayState = (state, payload) => state.set('isOpen', payload);

function requestsDialog(state = initial.get('requestsDialog'), {type, payload}) {
    switch (type) {
        case OPEN_REQUESTS_DIALOG:
            return updateDisplayState(state, true);

        case CLOSE_REQUESTS_DIALOG:
            return updateDisplayState(state, false);

        case UPDATE_REQUESTS_LIST:
            return updateRequestsList(state, payload);

        default:
            return state;
    }
}

export default requestsDialog;