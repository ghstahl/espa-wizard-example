import {
    getCss,
    bindEvents
} from '../utils.js';
import {
    getDummyJsonAsPromise
} from '../services/dummy.js';
import tpl from '../views/page-id-token.html';
import {
    factory as factoryWizardPage
} from '../services/wizard-page.js';
import * as wizardEngine from "../services/wizard-engine.js";
import * as wizardappapi from "../services/wizardappapi-client-services.js";
import {
    getState
} from '../services/state-machine.js';
import * as promisesHelpers from "../helpers/promises.js"
const _routeName = 'page-id-token';
const wizardPage = factoryWizardPage({
    getRouteName: function () {
        return _routeName;
    },
    onNext: function () {
        console.log("onNext");
        var el = document.getElementById('id_token');
        var wizardState = getState().wizardState;
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
    ESPA.registerRoute(wizardPage.getRouteName(), _registerRouteCallback);
}

function _registerRouteCallback(data) {
    viewData = data;
    wizardPage.augmentViewData(_routeName, viewData);

    var state = getState();
    return Promise.all([
            ESPA.loadResource.css(getCss()),
            wizardappapi.fetchIdToken()
        ])
        .then((results) => {
            var idTokenResult = results[1];
            viewData = Object.assign(viewData, serviceData);


            if (idTokenResult.response.status != 200) {
                var el = document.getElementById('id_token_error');
                el.innerHTML = "id_token has not been created!";
            } else {
                var json = idTokenResult.json;
                viewData.currentPageState.id_token = json.id_token;
            }

            var backPage = null;
            if (viewData.directive === wizardEngine.navigationDirective.Next) {
                backPage = viewData.wizardState.prevPage;
                viewData.currentPageState.backPage = backPage;
            }
            if (viewData.directive === wizardEngine.navigationDirective.Back) {
                backPage = viewData.currentPageState.backPage;
            }

            wizardEngine.setCurrentState({
                backPage: backPage,
                currentPage: wizardPage,
                nextPage: "page-access-token",
                back: false,
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


    if (state.access_token) {
        var el = document.getElementById('id_token');
        el.value = viewData.currentPageState.id_token;
    }


}

export {
    factory,
    _registerRouteCallback
};