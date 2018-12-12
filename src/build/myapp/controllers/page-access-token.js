import {
    getCss,
    bindEvents
} from '../utils.js';

import {
    getState
} from '../services/state-machine.js';
import {
    factory as factoryWizardPage
} from '../services/wizard-page.js';
import * as wizardEngine from "../services/wizard-engine.js"
import * as promisesHelpers from "../helpers/promises.js"
import * as wizardappapi from "../services/wizardappapi-client-services.js";
import tpl from '../views/page-access-token.html';
const _routeName = 'page-access-token';
const _wizardPage = factoryWizardPage({
    getRouteName: function () {
        return _routeName;
    },
    onNext: function () {
        console.log("onNext");
        var el = document.getElementById('access_token');
        var state = getState();
        state.access_token = el.value;
        var promise = Promise.all([
                wizardappapi.fetchIdentity(state.access_token)
                .then((result) => {
                    return result;
                }).catch(function (error) {
                    ESPA.logger.error(e);
                    throw new Error('apiPost error');
                }),
                wizardappapi.fetchEntitlements(state.access_token).then((result) => {
                    return result;
                }).catch(function (error) {
                    ESPA.logger.error(e);
                    throw new Error('apiPost error');
                })
            ]).then((results) => {
                var success = false;
                var identityResult = results[0];
                var entitlementResult = results[1];
                if (identityResult.response.status != 200) {
                    var el = document.getElementById('access_token_error');
                    el.innerHTML = "access_token has been rejected!";
                } else {
                    state.identity = identityResult.json;
                    success = true;
                }
                if (entitlementResult.response.status != 200) {
                    var el = document.getElementById('access_token_error');
                    el.innerHTML = "entitlementResult!";
                } else {
                    state.entitlements = entitlementResult.json.entitlements;
                }
                return success;
            })
            .catch(e => {
                ESPA.logger.error(e);
                return Promise.reject({
                    error: '_registerRouteCallback promise chain terminated'
                });
            });

        return promise;
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
    ESPA.registerRoute(_wizardPage.getRouteName(), _registerRouteCallback);
}

function _registerRouteCallback(data) {
    viewData = data;
    _wizardPage.augmentViewData(_routeName, viewData);
    var wizardState = viewData.wizardState;
    var currentPageState = viewData.currentPageState;
    currentPageState.access_token = wizardState.access_token;

    var state = getState();
    return Promise.all([
            ESPA.loadResource.css(getCss()),
        ])
        .then((results) => {
            viewData = Object.assign(viewData, serviceData);
            wizardEngine.setCurrentState({
                backPage: _wizardPage.getBackPage(viewData),
                currentPage: _wizardPage,
                nextPage: "page-one",
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
    document.getElementById('wizard-content').innerHTML = ESPA.tmpl(factoryScope.tpl, viewData);
    document.getElementById('main-container').style.display = 'block';

    bindEvents({});
    var state = getState();
    if (state.access_token) {
        var el = document.getElementById('access_token');
        el.value = state.access_token;
    }
}

export {
    factory,
    _registerRouteCallback
};