import {createSelector} from 'reselect';

export const getCurrentServiceChecker = (state, id) => {
    return createSelector([state => state.monitor.get('servicesCheckers')], servicesCheckers => {
        return servicesCheckers.toArray().find(key => key.get('id') === id);
    })(state, id);
};

export const getStatus = (state, id) => getCurrentServiceChecker(state, id).get('status');
export const getRequests = (state, id) => getCurrentServiceChecker(state, id).get('requests').toJS();
export const getDisabledStatus = (state, id) => getCurrentServiceChecker(state, id).get('disabled');
export const getParams = (state, id) => getCurrentServiceChecker(state, id).get('params').toJS();