import {
    getApiHost
} from '../utils.js';

export function apiGetAsPromise(host, obj) {
    //check cache
    const cacheKey = host + '/' + obj.url;
    const cache = ESPA.store.get(cacheKey);
    if (cache) {
        ESPA.logger.debug(`return cached data for GET cacheKey=${cacheKey}`);
        ESPA.trigger('/fetches/apiGET/' + obj.url + '/data', cache);
        return cache;
    }
    ESPA.logger.debug(`request: GET url=${obj.url}`);
    return _apiSend(host, obj.url, {
            method: 'GET'
        })
        .then(function (response) {
            ESPA.logger.debug(`response: ${obj.url}`, response);
            ESPA.trigger('/fetches/apiGET/' + obj.url + '/data', response);
            //cache data
            if (obj.cache) {
                ESPA.store.set(cacheKey, response);
            }
            return response;
        })
        .catch(function (e) {
            ESPA.logger.error(e);
            throw new Error('apiGet error');
        });
}

export function apiPostAsPromise(host, obj) {
    ESPA.logger.debug(`request: POST url=${obj.url}, body=${JSON.stringify(obj.data)}`);
    return _apiSend(host, obj.url, {
            body: JSON.stringify(obj.data),
            method: 'POST'
        })
        .then(function (response) {
            ESPA.logger.debug(`response: ${obj.url}`, response);
            ESPA.trigger('/fetches/apiPost/' + obj.url + '/data', response);
            return response;
        })
        .catch(function (e) {
            ESPA.logger.error(e);
            throw new Error('apiPost error');
        });
}

function _apiSend(host, url, data) {
    return fetch(host + url, Object.assign(data, {
            headers: _getHeaders(),
            credentials: 'include'
        }))
        .then(function (resp) {
            return resp.json();
        })
        .catch(function (e) {
            ESPA.logger.error(e);
            throw new Error('_apiSend error');
        });
}

function _getHeaders() {
    let tokenEl = document.querySelector('input[name="__RequestVerificationToken"]');
    let headers = {
        'Content-Type': 'application/json',
        'X-Frame-Options': 'SAMEORIGIN',
        'X-XSRF-Token': tokenEl ? tokenEl.value : ''
    };
    return headers;
}