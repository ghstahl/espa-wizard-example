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
    factory as factoryWizardPage
} from '../services/wizard-page.js';
import * as wizardEngine from "../services/wizard-engine.js"
import * as promisesHelpers from "../helpers/promises.js"

import tpl from '../views/page-one.html';
const _routeName = 'page-one';

const _wizardPage = factoryWizardPage({
    getRouteName: function () {
        return _routeName;
    },
    onNext: function () {
        console.log("onNext");
        return promisesHelpers.valueAsPromise(true);
    },
    onBack: function () {
        console.log("onBack");
        return promisesHelpers.valueAsPromise(true);
    },
    onCancel: function () {
        console.log("onCancel");
        return promisesHelpers.valueAsPromise(true);
    }
});



let _viewData = null;
let serviceData = null;
const _pageRecord = {
    factoryScope: null,
    tpl: tpl,
    wizardPage: _wizardPage,
    registerRouteCallback: _registerRouteCallback
}

const factory = _wizardPage.makeFactory(_pageRecord);

function _registerRouteCallback(data) {
    _viewData = data;
    _wizardPage.augmentViewData(_routeName, _viewData);
    var wizardState = _viewData.wizardState;
    var currentPageState = _viewData.currentPageState;

    var state = getState();
    return Promise.all([
            ESPA.loadResource.css(getCss()),
            getDummyJsonAsPromise()
        ])
        .then((results) => {
            serviceData = results[1];
            _viewData = Object.assign(_viewData, serviceData);
            state.identity.forEach(function (entry) {
                if (entry.name == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier") {
                    _viewData.user = entry.value;
                }
                console.log(entry);
            });
            _viewData.entitlements = state.entitlements;

            wizardEngine.setCurrentState({
                backPage: _wizardPage.getBackPage(_viewData),
                currentPage: _wizardPage,
                nextPage: "page-two",
                back: true,
                next: true,
                cancel: true,
                finish: false
            });
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
    document.getElementById('wizard-content').innerHTML = ESPA.tmpl(_pageRecord.factoryScope.tpl, _viewData);
    document.getElementById('main-container').style.display = 'block';

    bindEvents({
        'click #submitActivationKey': _onSumbitActivationKey
    });


}

function _onSumbitActivationKey(e) {
    e.preventDefault();
    const today = new SimpleDate(2000, 2, 28);
    today.addDays(1);
    var state = getState();
    var dd = document.getElementById('activationKey');
    state.activationKey = dd.value;
    dd = document.getElementById('activationKeyEcho');
    dd.value = state.activationKey;
}


export {
    factory,
    _registerRouteCallback
};