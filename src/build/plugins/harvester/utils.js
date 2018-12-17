export function getSpaHost() {    
    return 'http://localhost:8888/';
}

function getCurrentContext() {
    return "harvester";
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