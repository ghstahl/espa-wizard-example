import {
    apiGetAsPromise
} from './apiClient.js';
import {
    apiService
} from "./api-client-services.js"
export function getDummyJsonAsPromise() {
    return apiService.get("local", {
        url: 'src/build/myapp/mock/dummy.json',
        cache: true
    });
}