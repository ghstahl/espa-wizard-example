export function getSpaHost() {    
    return 'http://localhost:8888/';
}

function getCurrentContext() {
    return "harvester";
}

export function getCss() {    
    return `${getSpaHost()}src/build/plugins/${getCurrentContext()}/styles/${getCurrentContext()}.css`;
}
