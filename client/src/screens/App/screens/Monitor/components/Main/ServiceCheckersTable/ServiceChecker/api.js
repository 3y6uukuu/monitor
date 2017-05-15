import {SERVER} from '../../../../../../../../config';

function transactGet(service, params) {
    const {country, accessToken} = params;

    const url = `${SERVER.ORIGIN}:${SERVER.PORT}/${service}?country=${country}&accessToken=${accessToken}`;

    const options = {
        method: 'GET',
        headers: {
            'Cache-Control': 'no-store',
        },
    };

    return window.fetch(url, options)
        .then(handleResponse, handleNetworkError)
        .then(success => ({success}))
        .catch(error => ({error}));
}

function transactPost(service, params) {
    const URL = `${SERVER.ORIGIN}:${SERVER.PORT}/${service}`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
        },
        body: JSON.stringify(params),
    };

    return window.fetch(URL, options)
        .then(handleResponse, handleNetworkError)
        .then(success => ({success}))
        .catch(error => ({error}));
}

function handleResponse(response) {
    if (response.ok) {
        return response.json();
    } else {
        return response.json().then(error => {
            throw error;
        });
    }
}

function handleNetworkError(error) {
    throw new Error({
        message: error.message,
    });
}

export const getProfile = params => transactGet('api/getProfile', params);
export const getProducts = params => transactGet('api/getProducts', params);
export const getUsage = params => transactGet('api/getUsage', params);
export const getWiFiRoamingStatus = params => transactGet('api/getWiFiRoamingStatus', params);
export const getUserWiFiCredentials = params => transactGet('api/getUserWiFiCredentials', params);
export const getMobileAllowance = params => transactGet('api/mobileAllowance', params);

export const postWiFiCredentials = params => transactPost('api/postWiFiCredentials', params);
export const communityWiFiOptIn = params => transactPost('api/communityWiFiOptIn', params);
export const postMobileAllowance = params => transactPost('api/mobileAllowance', params);