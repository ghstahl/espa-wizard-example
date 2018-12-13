import {
    getCss
} from '../utils.js';

import tpl from '../views/page-id-token.html';
import * as wizardappapi from "../services/wizardappapi-client-services.js";
import * as promisesHelpers from "../helpers/promises.js"
const _routeName = 'page-id-token';
const _wizardPage = ESPA.plugins.factoryWizardPage({
    getRouteName: function () {
        return _routeName;
    },
    onNext: function () {
        console.log("onNext");
        var el = document.getElementById('id_token');
        var wizardState = ESPA.plugins.state.get().wizardState;
        var id_token = el.value;
        var promise = new Promise(function (resolve, reject) {
            // do a thing, possibly async, then…
            wizardappapi
                .bind(id_token)
                .then((result) => {
                    if (result.response.status != 200) {
                        var el = document.getElementById('id_token_error');
                        el.innerHTML = "id_token has been rejected!";
                        resolve(false);
                    } else {
                        var json = result.json;
                        wizardState.access_token = json.access_token;
                        resolve(true);
                    }
                }).catch(function (error) {
                    reject(false);
                    console.log('There has been a problem with your fetch operation: ', error.message);
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

    var state = ESPA.plugins.state.get();
    return Promise.all([
            ESPA.loadResource.css(getCss()),
            wizardappapi.fetchIdToken()
        ])
        .then((results) => {
            var idTokenResult = results[1];
            _viewData = Object.assign(_viewData, serviceData);


            if (idTokenResult.response.status != 200) {
                var el = document.getElementById('id_token_error');
                el.innerHTML = "id_token has not been created!";
            } else {
                var json = idTokenResult.json;
                _viewData.currentPageState.id_token = json.id_token;
            }
            var backPage = _wizardPage.getBackPage(_viewData);
            ESPA.plugins.wizardEngine.setCurrentState({
                backPage: backPage,
                currentPage: _wizardPage,
                nextPage: "page-access-token",
                back: backPage ? true : false,
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


    if (_viewData.currentPageState.id_token) {
        var el = document.getElementById('id_token');
        el.value = _viewData.currentPageState.id_token;
    }
}

export {
    factory,
    _registerRouteCallback
};