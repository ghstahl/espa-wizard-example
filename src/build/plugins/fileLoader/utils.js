export function getSpaHost() {    
    return 'http://localhost:8888/';
}

function getCurrentContext() {
    return "fileLoader";
}

export function getCss() {    
    return `${getSpaHost()}src/build/plugins/${getCurrentContext()}/styles/${getCurrentContext()}.css`;
}
