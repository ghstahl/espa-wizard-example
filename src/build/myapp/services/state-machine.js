export function getState() {
    return ESPA.store.get('myapp/state');
}

export function setState(obj) {
    ESPA.store.set('myapp/state', obj);
}