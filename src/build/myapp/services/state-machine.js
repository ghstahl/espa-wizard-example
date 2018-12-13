export function get() {
    return ESPA.store.get('myapp/state');
}

export function set(obj) {
    ESPA.store.set('myapp/state', obj);
}