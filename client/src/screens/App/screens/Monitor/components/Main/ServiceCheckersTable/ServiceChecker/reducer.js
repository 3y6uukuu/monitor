import {Map, List, fromJS} from 'immutable';
import {SERVICES, SERVICES_IDS} from '../../../../../../../../config';
import {
    UPDATE_BUTTON_STATE,
    UPDATE_REQUESTS_COUNTERS,
    DISABLE_SERVICE,
    GET_MOBILE_ALLOWANCE_SUCCESS,
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

function updateMobileAllowanceParams(state, payload) {
    return state.map(service => service.withMutations(mutableState => {
        const mutableStateId = mutableState.get('id');
        const {POST_MOBILE_ALLOWANCE_ROAMING, POST_MOBILE_ALLOWANCE_SPENDING} = SERVICES_IDS;

        // TODO: get allowanceValue from currentAllowance
        const {subscriberId, msisdn} = payload.body[0].subscriberAllowances[0];

        if (mutableStateId === POST_MOBILE_ALLOWANCE_ROAMING) {
            mutableState.mergeIn(['params'], fromJS({subscriberId, msisdn, currentAllowance: [{allowanceType: 'ROAMING', allowanceValue: 200}]}));
        } else if (mutableStateId === POST_MOBILE_ALLOWANCE_SPENDING) {
            mutableState.mergeIn(['params'], fromJS({subscriberId, msisdn, currentAllowance: [{allowanceType: 'SPENDING', allowanceValue: 300}]}));
        }
    }));
}

function servicesCheckers(state = initial.get('servicesCheckers'), {type, payload}) {
    switch (type) {
        case UPDATE_BUTTON_STATE:
            return updateButtonState(state, payload);

        case UPDATE_REQUESTS_COUNTERS:
            return updateRequestsCounters(state, payload);

        case DISABLE_SERVICE:
            return toggleDisabledState(state, payload);

        case GET_MOBILE_ALLOWANCE_SUCCESS:
            return updateMobileAllowanceParams(state, payload);

        default:
            return state;
    }
}

export default servicesCheckers;