let factoryScope = null;
const errorMsg = ":Method not implemented";
const factory = ((injected) => {
    const self = {
        onNext: (injected && injected.onNext) ? injected.onNext : onNext,
        onBack: (injected && injected.onBack) ? injected.onBack : onBack,
        onCancel: (injected && injected.onCancel) ? injected.onCancel : onCancel,
        getRouteName: (injected && injected.getRouteName) ? injected.getRouteName : getRouteName
    }

    //overridding
    factoryScope = ESPA.factoryMixin(self, injected);

    return factoryScope;
});

function throwNotImpleError(methodName) {
    throw new Error(methodName + " :Method not implemented");
}

function onNext() {
    throwNotImpleError('onNext')
}

function onBack() {
    throwNotImpleError('onBack')
}

function onCancel() {
    throwNotImpleError('onCancel')
}

function getRouteName() {
    throwNotImpleError('getRouteName')
}

export {
    factory
}