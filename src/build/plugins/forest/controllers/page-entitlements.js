import {
    getCss
} from '../utils.js';

import * as promisesHelpers from "../helpers/promises.js"

import tpl from '../views/page-entitlements.html';
const _routeName = 'page-entitlements';

const _wizardPage = ESPA.plugins.factoryWizardPage({
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
   
    var state = ESPA.plugins.state.get();
    return Promise.all([
            ESPA.loadResource.css(getCss())
        ])
        .then((results) => {
            _viewData = Object.assign(_viewData, {});
            state.identity.forEach(function (entry) {
                if (entry.name == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier") {
                    _viewData.user = entry.value;
                }
                console.log(entry);
            });
            _viewData.entitlements = state.entitlements;

            ESPA.plugins.wizardEngine.setCurrentState({
                backPage: _wizardPage.getBackPage(_viewData),
                currentPage: _wizardPage,
                nextPage: null,
                back: true,
                next: false,
                cancel: true,
                finish: true
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
    var currentPageState = _viewData.currentPageState;
    document.getElementById('loader').style.display = 'none';
    document.getElementById('wizard-content').innerHTML = ESPA.tmpl(_pageRecord.factoryScope.tpl, _viewData);
    document.getElementById('main-container').style.display = 'block';

    ESPA.plugins.bindEvents({
       
    });

}
 
export {
    factory,
    _registerRouteCallback
};