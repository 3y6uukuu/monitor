const getHeartbeat = state => state.getIn(['monitor', 'heartbeat']);

export const getState = state => getHeartbeat(state).get('state');
