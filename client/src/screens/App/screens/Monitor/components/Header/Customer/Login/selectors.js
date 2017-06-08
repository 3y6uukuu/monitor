import {createSelector} from 'reselect';

const getCustomer = state => state.getIn(['monitor', 'customer']);

export const getCountry = state => getCustomer(state).get('country');
export const getUserId = state => getCustomer(state).get('userId');
// export const getCustomerId = state => getCustomer(state).get('customerId');
export const getPassword = state => getCustomer(state).get('password');

export const userDataEntered = createSelector(getUserId, getPassword, (userId, password) => userId && password);
