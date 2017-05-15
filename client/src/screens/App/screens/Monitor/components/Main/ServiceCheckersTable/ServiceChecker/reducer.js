import {Map, List} from 'immutable';
import {SERVICES} from '../../../../../../../../config';
import {
    UPDATE_BUTTON_STATE,
    UPDATE_REQUESTS_COUNTERS,
    DISABLE_SERVICE,
} from '../../../../actions';

function generateServiceCheckers(services) {
    return services.map(service => {
        return Map({
            id: service.id,
            disabled: Boolean(service.disabled),
            params: Map(service.params),
            status: 'STOPPED',
            requests: Map({
                failed: 0,
                total: 0,
            }),
        })
    }, []);
}

const initial = Map({
    servicesCheckers: List(generateServiceCheckers(SERVICES)),
});

function updateButtonState(state, payload) {
    const {status} = payload;

    const index = state.findIndex(service => service.get('id') === payload.id);

    return state.setIn([index, 'status'], status);
}

function updateRequestsCounters(state, payload) {
    return state.map(service => service.withMutations(mutableState => {
        if (mutableState.get('id') === payload.id) {
            const {failedRequests, totalRequests} = payload;

            mutableState.setIn(['requests', 'failed'], failedRequests);
            mutableState.setIn(['requests', 'total'], totalRequests);
        }
    }));
}

function toggleDisabledState(state, payload) {
    const index = state.findIndex(service => service.get('id') === payload.id);
    const currentState = state.getIn([index, 'disabled']);

    return state.setIn([index, 'disabled'], !currentState);
}

function servicesCheckers(state = initial.get('servicesCheckers'), {type, payload}) {
    switch (type) {
        case UPDATE_BUTTON_STATE:
            return updateButtonState(state, payload);

        case UPDATE_REQUESTS_COUNTERS:
            return updateRequestsCounters(state, payload);

        case DISABLE_SERVICE:
            return toggleDisabledState(state, payload);

        default:
            return state;
    }
}

export default servicesCheckers;