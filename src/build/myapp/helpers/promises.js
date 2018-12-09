class PromisesHelpers {

    valueAsPromise(value) {
        return new Promise(function (resolve, reject) {
            resolve(value);
        });
    }
}
export var promisesHelpers = new PromisesHelpers();