let factoryScope = null;

const factory = ((injected) => {
    const self = {
        onNext: (injected && injected.onNext) ? injected.onNext : onNext,
        onBack: (injected && injected.onBack) ? injected.onBack : onBack,
        onCancel: (injected && injected.onCancel) ? injected.onCancel : onCancel
    }

    //overridding
    factoryScope = ESPA.factoryMixin(self, injected);

    return factoryScope;
});

function onNext() {
    throw new Error('You must implement onNext method');
}

function  onBack() {
    throw new Error('You must implement onBack method');
}

function  onCancel() {
    throw new Error('You must implement onCancel method');
}

export {
    factory
}