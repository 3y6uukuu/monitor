const getTimer = state => state.getIn(['monitor', 'timer']);

export const getStartTime = state => getTimer(state).get('startTime');
export const getEndTime = state => getTimer(state).get('endTime');
export const getInterval = state => getTimer(state).get('interval');
export const getWorkProgressState = state => getTimer(state).get('workInProgress');
