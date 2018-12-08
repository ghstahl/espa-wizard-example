export function getApiHost() {
    return 'http://localhost:8888/';
}

export function getSpaHost() {    
    return 'http://localhost:8888/';
}

export function getCss() {    
    return `${getSpaHost()}src/build/${getCurrentContext()}/styles/${getCurrentContext()}.css`;
}

function getCurrentContext() {
    return ESPA.store.get('app/context/name');
}

export function bindEvents(obj) {
    for (const key in obj) {
        const keyArr = key.split(' ');
        const event = keyArr[0];
        const selector = keyArr[1];
        const handler = obj[key];
        const els = document.querySelectorAll(selector);
  
        for (let i = 0; i < els.length; ++i) {
            const el = els[i];
            el.addEventListener(event, handler);
        }
    }
}
  
export function getCookie(cname) {
    const name = `${cname}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}

const polyfillArrReady = [];
function _checkPolyfillReady(polyfillArr, polyfillArrReady, callback) {
    if (polyfillArr.length === polyfillArrReady.length) {
        if (polyfillArr.sort().join(',') === polyfillArrReady.sort().join(',')) {
            ESPA.logger.info('Polyfill check complete');
            callback();
        } else {
            ESPA.logger.error('Polyfill check error');
        }
    }
}

export function polyfill(polyfillArr, callback) {
    for (let i = 0; i < polyfillArr.length; ++i) {
        const ns = polyfillArr[i];

        const s = ns.split('.');
        let obj = window;
        for (let i = 0; i < s.length; i++) {
            obj = obj[s[i]];

            if (!obj) { // BREAK IF PATH DOESN'T EXISTS TO POLYFILL
                break;
            }
        }

        if (obj) {
            ESPA.logger.debug(`utils.polyfill, already exists: ${ns}`);
            polyfillArrReady.push(ns);
            _checkPolyfillReady(polyfillArr, polyfillArrReady, callback);
        } else {
            ESPA.logger.debug(`utils.polyfill, loading: ${ns}`);
            ESPA.loadResource.jsCallback(`${getSpaHost()}src/build/${getCurrentContext()}/polyfill/${ns.toLowerCase()}.js`, () => {
                polyfillArrReady.push(ns);
                _checkPolyfillReady(polyfillArr, polyfillArrReady, callback);
            });
        }
    }
}
