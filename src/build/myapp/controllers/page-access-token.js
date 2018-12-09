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
import fetchService from '../services/fetch-service.js';
import tpl from '../views/page-access-token.html';

class PageAccessTokenWizardPage extends WizardPage {

    onNext() {
        console.log("onNext");
        var el = document.getElementById('access_token');
        var state = getState();
        state.access_token = el.value;
        var promise = new Promise(function (resolve, reject) {
            // do a thing, possibly async, then…
            fetchService.fetch('https://wizardappapi.azurewebsites.net/api/Identity/closed', {
                headers: {
                    "Authorization": "Bearer " + state.access_token,
                    "x-authScheme": "One"
                },
            }).then((result) => {
                if (result.response.status != 200) {
                    var el = document.getElementById('access_token_error');
                    el.innerHTML = "access_token has been rejected!";
                    resolve(false);
                } else {
                    state.identity = result.json;
                    resolve(true);
                }
            }).catch(function (error) {
                reject(false);
                console.log('There has been a problem with your fetch operation: ', error.message);
            });
        });
        return promise;
    }
    onBack() {
        console.log("onBack");
        var promise = new Promise(function (resolve, reject) {
            resolve(true);
        });
        return promise;
    }
    onCancel() {
        console.log("onCancel");
        var promise = new Promise(function (resolve, reject) {
            resolve(true);
        });
        return promise;
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
    ESPA.registerRoute('page-access-token', _registerRouteCallback);
}

function _registerRouteCallback(data) {
    viewData = data || {};
    var state = getState();
    return Promise.all([
            ESPA.loadResource.css(getCss()),
        ])
        .then((results) => {
            viewData = Object.assign(viewData, serviceData);
            viewData.access_token = state.access_token;
            viewData.data = {
                bar: "Bar This"
            }
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
    var state = getState();
    if (state.access_token) {
        var el = document.getElementById('access_token');
        el.value = state.access_token;
    }
    wizardEngine.setCurrentState({
        currentPage: new PageAccessTokenWizardPage(),
        nextPage: "page-one",
        backPage: null,
        back: false,
        next: true,
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