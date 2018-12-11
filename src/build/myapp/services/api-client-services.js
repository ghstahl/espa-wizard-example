import {
    apiGetAsPromise,
    apiPostAsPromise
} from './apiClient.js';

let hosts = {};

export function registerHost(hostKey, host) {
    hosts[hostKey] = host;
}

export function get(hostKey, obj) {
    if (hosts[hostKey]) {
        return apiGetAsPromise(hosts[hostKey], obj)
    } else {
        throw new Error('${hostKey} Does not exist');
    }

}

export function post(hostKey, obj) {
    if (hosts[hostKey]) {
        return apiPostAsPromise(hosts[hostKey], obj)
    } else {
        throw new Error('${hostKey} Does not exist');
    }

}