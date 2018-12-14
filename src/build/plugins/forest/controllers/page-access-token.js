import {
    getCss
} from '../utils.js';
import * as promisesHelpers from "../helpers/promises.js"
import * as wizardappapi from "../services/wizardappapi-client-services.js";
import tpl from '../views/page-access-token.html';
const _routeName = 'page-access-token';
const _wizardPage = ESPA.plugins.factoryWizardPage({
    getRouteName: function () {
        return _routeName;
    },
    onNext: function () {
        console.log("onNext");
        var el = document.getElementById('access_token');
        var state = ESPA.plugins.state.get();
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
    currentPageState.access_token = wizardState.access_token;

    var state = ESPA.plugins.state.get();
    return Promise.all([
            ESPA.loadResource.css(getCss()),
        ])
        .then((results) => {
            _viewData = Object.assign(_viewData, serviceData);
            ESPA.plugins.wizardEngine.setCurrentState({
                backPage: _wizardPage.getBackPage(_viewData),
                currentPage: _wizardPage,
                nextPage: "page-entitlements",
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

    ESPA.plugins.bindEvents({});
    var state = ESPA.plugins.state.get();
    if (state.access_token) {
        var el = document.getElementById('access_token');
        el.value = state.access_token;
    }
}

export {
    factory,
    _registerRouteCallback
};