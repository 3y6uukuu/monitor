const getRequestsDialog = state => state.getIn(['monitor', 'requestsDialog']);

export const getIsOpen = state => getRequestsDialog(state).get('isOpen');
export const getServiceId = state => getRequestsDialog(state).get('serviceId');
export const getRequests = state => getRequestsDialog(state).get('requests');
