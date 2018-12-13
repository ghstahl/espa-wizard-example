import {
    getCss
} from '../utils.js';

import {
    getDummyJsonAsPromise
} from '../services/dummy.js';
import * as wizardappapi from "../services/wizardappapi-client-services.js";
import * as promisesHelpers from "../helpers/promises.js"

import tpl from '../views/page-harvest.html';
const _routeName = 'page-harvest';

const _wizardPage = ESPA.plugins.factoryWizardPage({
    getRouteName: function () {
        return _routeName;
    },
    onNext: function () {
        console.log("onNext");
        var currentPageState = _viewData.currentPageState;
        var wizardState = ESPA.plugins.state.get().wizardState;
        var promise = new Promise(function (resolve, reject) {
            // do a thing, possibly async, then…
            wizardappapi
                .fetchProductHarvest(currentPageState.harvestUrl)
                .then((result) => {
                    if (result.response.status != 200) {
                        var el = document.getElementById('error');
                        el.innerHTML = "harvest has been rejected!";
                        resolve(false);
                    } else {
                        var json = result.json;
                        wizardState.product_harvest = json;
                        resolve(true);
                    }
                }).catch(function (error) {
                    reject(false);
                    console.log('There has been a problem with your fetch operation: ', error.message);
                });
        });
        return promise;

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

const _harvestRecords = [{
        id: "rad1",
        value: "harvest/product-instance-one.json",
        label: "Product One"
    },
    {
        id: "rad2",
        value: "harvest/product-instance-two.json",
        label: "Product Two"
    },
    {
        id: "rad3",
        value: "harvest/product-instance-three.json",
        label: "Product Three"
    }
];

function _registerRouteCallback(data) {
    _viewData = data;
    _wizardPage.augmentViewData(_routeName, _viewData);
    var wizardState = _viewData.wizardState;
    var currentPageState = _viewData.currentPageState;
    if (currentPageState.radioId === undefined) {
        currentPageState.radioId = _harvestRecords[0].id;
        currentPageState.harvestUrl = _harvestRecords[0].value;
    }
    var state = ESPA.plugins.state.get();
    return Promise.all([
            ESPA.loadResource.css(getCss()),
            getDummyJsonAsPromise()
        ])
        .then((results) => {
            serviceData = results[1];
            _viewData = Object.assign(_viewData, serviceData);
            _viewData.harvestRecords = _harvestRecords;
 

            ESPA.plugins.wizardEngine.setCurrentState({
                backPage: _wizardPage.getBackPage(_viewData),
                currentPage: _wizardPage,
                nextPage: "page-id-token",
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
    var currentPageState = _viewData.currentPageState;
    document.getElementById('loader').style.display = 'none';
    document.getElementById('wizard-content').innerHTML = ESPA.tmpl(_pageRecord.factoryScope.tpl, _viewData);
    document.getElementById('main-container').style.display = 'block';

    var bindRecord = {};
    _harvestRecords.forEach(function (entry) {
        bindRecord[`click #${entry.id}`] = _radHandler;
        console.log(entry);
    });

    ESPA.plugins.bindEvents(bindRecord);
    document.getElementById(currentPageState.radioId).checked = true;


}

function _radHandler(e) {
    var currentPageState = _viewData.currentPageState;
    currentPageState.radioId = e.srcElement.id;
    currentPageState.harvestUrl = e.srcElement.value;
}
 
export {
    factory,
    _registerRouteCallback
};