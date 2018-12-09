import {
    getCss,
    bindEvents
} from '../utils.js';
import {
    getDummyJsonAsPromise
} from '../services/dummy.js';
import {
    getState
} from '../services/state-machine.js';
import {
    WizardPage,
    wizardEngine
} from '../services/wizard-services.js';
import {
    promisesHelpers
} from '../helpers/promises.js';
import tpl from '../views/page-two.html';

class PageTwoWizardPage extends WizardPage {

    onNext() {
        console.log("onNext");
        return promisesHelpers.valueAsPromise(true);
    }
    onBack() {
        console.log("onBack");
        return promisesHelpers.valueAsPromise(true);
    }
    onCancel() {
        console.log("onCancel");
        return promisesHelpers.valueAsPromise(true);
    }

}

let viewData = null;
let serviceData = null;
let factoryScope = null;

const factory = ((injected) => {
    const self = {
        cfg: (injected && injected.cfg) ? injected.cfg : null,
        tpl: (injected && injected.tpl) ? injected.tpl : tpl
    }

    //overridding
    factoryScope = ESPA.factoryMixin(self, injected);

    init();

    return factoryScope;
});

function init() {
    ESPA.registerRoute('page-two', _registerRouteCallback);
}

function _registerRouteCallback(data) {
    viewData = data || {};

    return Promise.all([
            ESPA.loadResource.css(getCss()),
            getDummyJsonAsPromise()
        ])
        .then((results) => {
            serviceData = results[1];
            viewData = Object.assign(viewData, serviceData);
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
    document.getElementById('loader').style.display = 'none';
    document.getElementById('wizard-content').innerHTML = ESPA.tmpl(factoryScope.tpl, viewData);
    document.getElementById('main-container').style.display = 'block';

    bindEvents({
        'click #submitActivationKey': _onSumbitActivationKey,
        'click #go-to-bar': _onGoToBar
    });
    wizardEngine.setCurrentState({
        currentPage: new PageTwoWizardPage(),
        nextPage: null,
        backPage: "page-one",
        back: true,
        next: false,
        finish: true,
        cancel: true
    });

}

function _onSumbitActivationKey(e) {
    e.preventDefault();
    var state = getState();
    var dd = document.getElementById('activationKey');
    state.activationKey = dd.value;
    dd = document.getElementById('activationKeyEcho');
    dd.value = state.activationKey;
}

function _onGoToBar(e) {
    e.preventDefault();

    ESPA.navigate('bar');
}

export {
    factory,
    _registerRouteCallback
};