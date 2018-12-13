let factoryScope = null;
const errorMsg = ":Method not implemented";
const factory = ((injected) => {
    const self = {
        onNext: (injected && injected.onNext) ? injected.onNext : onNext,
        onBack: (injected && injected.onBack) ? injected.onBack : onBack,
        onCancel: (injected && injected.onCancel) ? injected.onCancel : onCancel,
        onFinish: (injected && injected.onFinish) ? injected.onFinish : onFinish,
        getRouteName: (injected && injected.getRouteName) ? injected.getRouteName : getRouteName,
        getBackPage: (injected && injected.getBackPage) ? injected.getBackPage : getBackPage,
        makeFactory: (injected && injected.makeFactory) ? injected.makeFactory : makeFactory,
        augmentViewData: augmentViewData
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

function onFinish() {
    throwNotImpleError('onFinish')
}

function augmentViewData(routeName, viewData) {
    var wizardState = viewData.wizardState;
    if (wizardState[routeName] === undefined) {
        wizardState[routeName] = {}
    }
    viewData.currentPageState = wizardState[routeName];
}

function getBackPage(viewData) {
    var backPage = null;
    if (viewData.directive === ESPA.plugins.wizardEngine.navigationDirective.Next) {
        backPage = viewData.wizardState.prevPage;
        viewData.currentPageState.backPage = backPage;
    }
    if (viewData.directive === ESPA.plugins.wizardEngine.navigationDirective.Back) {
        backPage = viewData.currentPageState.backPage;
    }
    return backPage;
}

function makeFactory(pageRecord) {
    var factory = ((injected) => {
        const self = {
            cfg: (injected && injected.cfg) ? injected.cfg : null,
            tpl: (injected && injected.tpl) ? injected.tpl : pageRecord.tpl
        }

        //overridding
        pageRecord.factoryScope = ESPA.factoryMixin(self, injected);

        ESPA.registerRoute(pageRecord.wizardPage.getRouteName(), pageRecord.registerRouteCallback);

        return pageRecord.factoryScope;
    });
    return factory;
}

export {
    factory
}