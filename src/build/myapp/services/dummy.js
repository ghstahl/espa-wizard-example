import {
    apiGetAsPromise
} from './apiClient.js';
import {
    get as getRequest
} from "./api-client-services.js"
export function getDummyJsonAsPromise() {
    return getRequest("local", {
        url: 'src/build/myapp/mock/dummy.json',
        cache: true
    });
}