
export function getDummyJsonAsPromise() {
    return ESPA.plugins.getRequest("local", {
        url: 'src/build/myapp/mock/dummy.json',
        cache: true
    });
}