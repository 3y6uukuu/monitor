export const getAccessCode = state => state.monitor.getIn(['auth', 'accessCode']);
export const getAccessToken = state => state.monitor.getIn(['auth', 'accessToken']);
export const getRefreshToken = state => state.monitor.getIn(['auth', 'refreshToken']);
