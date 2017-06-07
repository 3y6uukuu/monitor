export const getStartTime = state => state.monitor.getIn(['timer', 'startTime']);
export const getEndTime = state => state.monitor.getIn(['timer', 'endTime']);
export const getInterval = state => state.monitor.getIn(['timer', 'interval']);
export const getWorkProgressState = state => state.monitor.getIn(['timer', 'workInProgress']);