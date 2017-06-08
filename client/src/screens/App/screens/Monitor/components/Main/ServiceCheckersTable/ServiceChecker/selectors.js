import {createSelector} from 'reselect';

const getCurrentServiceChecker = (state, id) => {
    return createSelector([state => state.getIn(['monitor', 'servicesCheckers'])], servicesCheckers => {
        return servicesCheckers.toArray().find(key => key.get('id') === id);
    })(state, id);
};

export const getStatus = (state, id) => getCurrentServiceChecker(state, id).get('status');
export const getRequests = (state, id) => getCurrentServiceChecker(state, id).get('requests').toJS();
export const getDisabledStatus = (state, id) => getCurrentServiceChecker(state, id).get('disabled');
export const getParams = (state, id) => getCurrentServiceChecker(state, id).get('params').toJS();