import {SERVER} from '../../../../../../../../config';

function transactGet(service, params) {
    const {country, serviceId} = params;

    const url = `${SERVER.ORIGIN}:${SERVER.PORT}/${service}?country=${country}&serviceId=${serviceId}`;

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

function handleResponse(response) {
    return response.ok ? response.json() : response.json().then(error => {
        throw error
    });
}

function handleNetworkError(error) {
    throw new Error({
        message: error.message,
    });
}

export const getFailedRequests = params => transactGet('api/logger/getFailedRequests', params);