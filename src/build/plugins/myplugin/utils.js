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
    return `${getSpaHost()}src/build/plugins/${getCurrentContext()}/styles/${getCurrentContext()}.css`;
}
