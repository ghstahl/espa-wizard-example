export function getSpaHost() {
    return 'http://localhost:8888/';
}

function getCurrentContext() {
    return "forest";
}

export function getCss() {
    return `${getSpaHost()}src/build/plugins/${getCurrentContext()}/styles/${getCurrentContext()}.css`;
}