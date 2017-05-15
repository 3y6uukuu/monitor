export const getStartTime = state => state.monitor.timer.get('startTime');
export const getEndTime = state => state.monitor.timer.get('endTime');
export const getInterval = state => state.monitor.timer.get('interval');
export const getWorkProgressState = state => state.monitor.timer.get('workInProgress');