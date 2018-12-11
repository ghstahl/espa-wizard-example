export function fetch(input, init) {
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
    return window.fetch(input, init)
    .then(function(response) {
        result.response = response;        
        return response;
    })
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        if (init.method === 'HEAD') {
            //do nothing
        } else {            
            result.json = data;
            result.error = null;
        }
        return result;
    })
    .catch(function(e) {
        ESPA.logger.error(e);
        result.error = 'exception caught';
        result.exception = e;
        return result;
    });
}