import {
    getCss
} from '../utils.js';

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
        //load forest and continue with plugin flow
        document.getElementById('loader').style.display = 'block';
        return ESPA.plugins.load(currentPageState.pluginKey, ESPA.plugins.metaData)
            .then(function (data) {
                var currentState = ESPA.plugins.wizardEngine.getCurrentState();
                currentState.nextPage = data.json['entry-page'];
                ESPA.plugins.wizardEngine.setCurrentState(currentState);
                return true;
            })
            .catch(function (e) {
                ESPA.logger.error(e);
            });
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
const _pageRecord = {
    factoryScope: null,
    tpl: tpl,
    wizardPage: _wizardPage,
    registerRouteCallback: _registerRouteCallback
}

const factory = _wizardPage.makeFactory(_pageRecord);

const _harvestRecords = [{
        id: "rad1",
        value: "forest",
        label: "Forest"
    },
    {
        id: "rad2",
        value: "fileLoader",
        label: "File Loader"
    } 
];

function _registerRouteCallback(data) {
    _viewData = data;
    _wizardPage.augmentViewData(_routeName, _viewData);
    var wizardState = _viewData.wizardState;
    var currentPageState = _viewData.currentPageState;
    if (currentPageState.radioId === undefined) {
        currentPageState.radioId = _harvestRecords[0].id;
        currentPageState.pluginKey = _harvestRecords[0].value;
    }
    var state = ESPA.plugins.state.get();
    return Promise.all([
            ESPA.loadResource.css(getCss())
        ])
        .then((results) => {
            _viewData = Object.assign(_viewData, {});
            _viewData.harvestRecords = _harvestRecords;

            var backPage = _wizardPage.getBackPage(_viewData);
            ESPA.plugins.wizardEngine.setCurrentState({
                backPage: backPage,
                currentPage: _wizardPage,
                nextPage: null,
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
    currentPageState.pluginKey = e.srcElement.value;
}

export {
    factory,
    _registerRouteCallback
};