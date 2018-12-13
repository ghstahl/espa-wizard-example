import {
    getCss,
    bindEvents,
    getSpaHost
} from '../utils.js';
import tpl from '../views/wizard-container.html';
import tplBar from '../views/wizard-button-bar.html';

import 'src/build/plugins/myplugin/main.js';

const wizardListener = ESPA.plugins.factoryWizardListener({
    onStateChange: function (state) {
        ESPA.logger.log('onStateChange');
        var backButtonClasses = document.getElementById("back-wizard").classList;
        var nextButtonClasses = document.getElementById("next-wizard").classList;
        var cancelButtonClasses = document.getElementById("cancel-wizard").classList;
        var finishButtonClasses = document.getElementById("finish-wizard").classList;
        if (state.next) {
            nextButtonClasses.remove("disabled");
        } else {
            nextButtonClasses.add("disabled");
        }
        if (state.back) {
            backButtonClasses.remove("disabled");
        } else {
            backButtonClasses.add("disabled");
        }
        if (state.cancel) {
            cancelButtonClasses.remove("disabled");
        } else {
            cancelButtonClasses.add("disabled");
        }
        if (state.finish) {
            finishButtonClasses.remove("disabled");
        } else {
            finishButtonClasses.add("disabled");
        }
    }
});


let _viewData = null;
let serviceData = null;
let factoryScope = null;

const factory = ((injected) => {
    const self = {
        cfg: (injected && injected.cfg) ? injected.cfg : null,
        tpl: (injected && injected.tpl) ? injected.tpl : tpl,
        tplBar: (injected && injected.tplBar) ? injected.tplBar : tplBar
    }

    //overridding
    factoryScope = ESPA.factoryMixin(self, injected);

    init();

    return factoryScope;
});

function init() {
    ESPA.registerRoute('wizard-container', _registerRouteCallback);
    ESPA.plugins.wizardEngine.registerStateListener(wizardListener);
}

function _registerRouteCallback(data) {
    _viewData = data || {};
    var state = ESPA.plugins.state.get();
    return Promise.all([
        ESPA.loadResource.css(getCss())
    ])
    .then((results) => {
        //serviceData = results[1];
        _viewData = Object.assign(_viewData, serviceData);
        state.wizardState = {}; // initialize wizardState.

        _displayView();
    })
    .catch(e => {
        ESPA.logger.error(e);
        return Promise.reject({
            error: '_registerRouteCallback promise chain terminated'
        });
    });
}

function _displayView() {
    var state = ESPA.plugins.state.get();
    document.getElementById('loader').style.display = 'none';
    document.getElementById('main-content').innerHTML = ESPA.tmpl(factoryScope.tpl, _viewData);
    document.getElementById('wizard-button-bar').innerHTML = ESPA.tmpl(factoryScope.tplBar, _viewData);
    document.getElementById('main-container').style.display = 'block';

    bindEvents({
        'click #back-wizard': _onBackWizard,
        'click #next-wizard': _onNextWizard,
        'click #cancel-wizard': _onCancelWizard,
        'click #finish-wizard': _onFinishWizard
    });
    ESPA.plugins.wizardEngine.setCurrentState({
        currentPage: null,
        nextPage: null,
        backPage: null,
        back: false,
        next: false,
        cancel: true,
        finish: false
    });
    
    ESPA.navigate('page-id-token', {
        directive: ESPA.plugins.wizardEngine.navigationDirective.Next,
        prevPage: null,
        wizardState: state.wizardState
    });
}

function _onBackWizard(e) {
    e.preventDefault();
    console.log("_onBackWizard");
    ESPA.plugins.wizardEngine.onBackWizardPage().then((result) => {
        if (result) {
            var stateWizardPage = ESPA.plugins.wizardEngine.getCurrentState();
            var state = ESPA.plugins.state.get();
            state.wizardState.prevPage = null;
            ESPA.navigate(stateWizardPage.backPage, {
                directive: ESPA.plugins.wizardEngine.navigationDirective.Back,
                wizardState: state.wizardState
            });
        }
    });
}

function _onNextWizard(e) {
    e.preventDefault();
    console.log("_onNextWizard");
    ESPA.plugins.wizardEngine.onNextWizardPage().then((result) => {
        if (result) {
            var stateWizardPage = ESPA.plugins.wizardEngine.getCurrentState();
            var state = ESPA.plugins.state.get();
            state.wizardState.prevPage = stateWizardPage.currentPage.getRouteName();
            ESPA.navigate(stateWizardPage.nextPage, {
                directive: ESPA.plugins.wizardEngine.navigationDirective.Next,
                wizardState: state.wizardState
            });
        }
    });
}

function _onCancelWizard(e) {
    e.preventDefault();
    console.log("_onCancelWizard");
    var ok = ESPA.plugins.wizardEngine.onCancelWizardPage();
}

function _onFinishWizard(e) {
    e.preventDefault();
    console.log("_onFinishWizard");
    var ok = ESPA.plugins.wizardEngine.onFinishWizardPage();
}
export {
    factory,
    _registerRouteCallback
};