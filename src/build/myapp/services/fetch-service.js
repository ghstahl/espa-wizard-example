 

class FetchService {

    // async function
    async fetch(input, init) {
        if (!init) {
            init = {};
        }
        if (!init.headers) {
            init.headers = {};
        }
        if (!init.credentials) {
            init.credentials = 'include';
        }
        // we are a json shop
        if (!init.headers['Content-Type']) {
            init.headers['Content-Type'] = 'application/json';
        }
        if (!init.headers['Accept']) {
            init.headers['Accept'] = 'application/json';
        }
        if (init.body) {
            let type = typeof (init.body);

            if (type === 'object') {
                init.body = JSON.stringify(init.body);
            }
        }
        let result = {};
        try {
            // await response of fetch call
            let response = await window.fetch(input, init);
            result.response = response;
            if (response.status === 204) {
                result.error = 'WTF is this 204 garbage!';
            } else {
                if (response.ok) {
                    if (init.method === 'HEAD') {} else {
                        let data = await response.json();
                        result.json = data;
                        result.error = null;
                    }
                }
            }
        } catch (e) {
            result.error = 'exception caught'
            result.exception = e;
        }
        return result;
    }

}

export default new FetchService()
