const getAuth = state => state.getIn(['monitor', 'auth']);

export const getAccessCode = state => getAuth(state).get('accessCode');
export const getAccessToken = state => getAuth(state).get('accessToken');
export const getRefreshToken = state => getAuth(state).get('refreshToken');
