import {createSelector} from 'reselect';

export const getCountry = state => state.monitor.customer.get('country');
export const getUserId = state => state.monitor.customer.get('userId');
export const getCustomerId = state => state.monitor.customer.get('customerId');
export const getPassword = state => state.monitor.customer.get('password');

export const userDataEntered = createSelector(getUserId, getPassword, (userId, password) => userId && password);
