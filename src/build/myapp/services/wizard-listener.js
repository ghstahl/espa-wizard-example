let factoryScope = null;

const factory = ((injected) => {
    const self = {
        onStateChange: (injected && injected.onStateChange) ? injected.onStateChange : onStateChange
    }

    //overridding
    factoryScope = ESPA.factoryMixin(self, injected);

    return factoryScope;
});

function onStateChange(state) {
    throw new Error('You must implement onStateChange method');
}

export {
    factory
}