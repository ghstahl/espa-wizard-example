export function getApiHost() {
    return 'http://localhost:8888/';
}

export function getSpaHost() {    
    return 'http://localhost:8888/';
}

function getCurrentContext() {
    return "myplugin";
}

export function getCss() {
    let url = '';
    if (ESPA.plugins.env !== 'prod') {
        url = `${getSpaHost()}src/build/plugins/${getCurrentContext()}/styles/${getCurrentContext()}.css`;
    } else {
        url = `${getSpaHost()}plugins/styles/${getCurrentContext()}.css`;
    }
    return url;
}