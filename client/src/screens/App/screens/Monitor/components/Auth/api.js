import {SERVER} from '../../../../../../config';

function transact(url, params) {
    const URL = `${SERVER.ORIGIN}:${SERVER.PORT}/${url}`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
        },
        body: JSON.stringify(params)
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
        message: error.message
    });
}

export const getAccessCode = params => transact('api/getAccessCode', params);
export const getAccessToken = params => transact('api/getAccessToken', params);
export const getFreshAccessToken = params => transact('api/getFreshAccessToken', params);