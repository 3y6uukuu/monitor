import {createSelector} from 'reselect';

export const getCountry = state => state.monitor.getIn(['customer', 'country']);
export const getUserId = state => state.monitor.getIn(['customer', 'userId']);
// export const getCustomerId = state => state.monitor.getIn(['customer', 'customerId']);
export const getPassword = state => state.monitor.getIn(['customer', 'password']);

export const userDataEntered = createSelector(getUserId, getPassword, (userId, password) => userId && password);
