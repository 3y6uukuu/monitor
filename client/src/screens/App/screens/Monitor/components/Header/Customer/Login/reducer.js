import {Map} from 'immutable';
import {LOG_IN} from '../../../../actions';

const initial = Map({
    customer: Map({
        country: null,
        userId: null,
        customerId: null,
        password: null,
    }),
});

function updateCustomerState(state, payload) {
    const {country, userId, password} = payload;
    const customerId = userId.split('@')[0];

    return state.merge(Map({country, userId, password, customerId}));
}

function customer(state = initial.get('customer'), {type, payload}) {
    switch (type) {
        case LOG_IN:
            return updateCustomerState(state, payload);

        default:
            return state;
    }
}

export default customer;