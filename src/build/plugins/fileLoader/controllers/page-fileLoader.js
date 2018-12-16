import {
    getCss
} from '../utils.js';

import * as wizardappapi from "../services/wizardappapi-client-services.js";
import * as promisesHelpers from "../helpers/promises.js"
import {
    setupDragAndUpload
} from "../helpers/drag-n-upload-2.0.js";



import tpl from '../views/page-fileLoader.html';
const _routeName = 'page-fileLoader';

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
        return ESPA.plugins.load('forest')
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

            var backPage = _wizardPage.getBackPage(_viewData);
            ESPA.plugins.wizardEngine.setCurrentState({
                backPage: backPage,
                currentPage: _wizardPage,
                nextPage: null,
                back: backPage ? true : false,
                next: false,
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

function _ProcessFiles(files) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var text = reader.result;
            var currentState = ESPA.plugins.wizardEngine.getCurrentState();
            currentState.finish = true;
            ESPA.plugins.wizardEngine.setCurrentState(currentState);

            resolve(true);
        }
        reader.readAsText(files[0]);
    });
}

function _displayView() {
    var currentPageState = _viewData.currentPageState;
    document.getElementById('loader').style.display = 'none';
    document.getElementById('wizard-content').innerHTML = ESPA.tmpl(_pageRecord.factoryScope.tpl, _viewData);
    document.getElementById('main-container').style.display = 'block';

    var bindRecord = {};

    setupDragAndUpload({
        ProcessFiles: _ProcessFiles
    });


    ESPA.plugins.bindEvents(bindRecord);
}

export {
    factory,
    _registerRouteCallback
};