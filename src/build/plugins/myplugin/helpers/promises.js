export function valueAsPromise(value) {
    return new Promise(function (resolve, reject) {
        resolve(value);
    });
}