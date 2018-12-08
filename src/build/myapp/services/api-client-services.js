import {
    apiGetAsPromise,
    apiPostAsPromise
} from './apiClient.js';

class ApiService {
    constructor() {
        this.hosts = {};
    }
    registerHost(hostKey, host) {
        this.hosts[hostKey] = host;
    }
    get(hostKey, obj) {
        if (this.hosts[hostKey]) {
            return apiGetAsPromise(this.hosts[hostKey], obj)
        } else {
            throw new Error('${hostKey} Does not exist');
        }

    }
    post(hostKey, obj) {
        if (this.hosts[hostKey]) {
            return apiPostAsPromise(this.hosts[hostKey], obj)
        } else {
            throw new Error('${hostKey} Does not exist');
        }

    }
}
export var apiService = new ApiService();