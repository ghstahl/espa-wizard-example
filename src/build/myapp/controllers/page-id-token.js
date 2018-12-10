import { getCss, bindEvents } from '../utils.js';
import { getDummyJsonAsPromise } from '../services/dummy.js';
import tpl from '../views/page-id-token.html';
import { factory as factoryWizardPage } from '../services/wizard-page.js';
import * as wizardEngine from "../services/wizard-engine.js";
import fetchService from '../services/fetch-service.js';
import {
    getState
} from '../services/state-machine.js';
import * as promisesHelpers from "../helpers/promises.js"
const wizardPage = factoryWizardPage({
    onNext: function() {
        console.log("onNext");
        var el = document.getElementById('id_token');
        var state = getState();
        state.id_token = el.value;
        var promise = new Promise(function (resolve, reject) {

            let details = {
                'id_token': state.id_token
            };

            let formBody = [];
            for (let property in details) {
                let encodedKey = encodeURIComponent(property);
                let encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");

            // do a thing, possibly async, then…
            fetchService.fetch('https://wizardappapi.azurewebsites.net/api/Identity/bind', {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Accept": "application/json"
                },
                body: formBody
            }).then((result) => {
                if (result.response.status != 200) {
                    var el = document.getElementById('id_token_error');
                    el.innerHTML = "id_token has been rejected!";
                    resolve(false);
                } else {
                    var json = result.json;
                    state.access_token = json.access_token;
                    resolve(true);
                }
            }).catch(function (error) {
                reject(false);
                console.log('There has been a problem with your fetch operation: ', error.message);
            });
        });
        return promise;
    },
    onBack: function() {
        console.log("onBack");
        return promisesHelpers.valueAsPromise(true);
    },
    onCancel: function() {
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
    ESPA.registerRoute('page-id-token', _registerRouteCallback);
}

function _registerRouteCallback(data) {
    viewData = data || {};
    var state = getState();
    return Promise.all([
            ESPA.loadResource.css(getCss()),
        ])
        .then((results) => {
            viewData = Object.assign(viewData, serviceData);
            viewData.id_token = state.id_token;
            viewData.data = {
                bar: "id_token"
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

    bindEvents({});
    var state = getState();
    if (state.access_token) {
        var el = document.getElementById('id_token');
        el.value = state.id_token;
    }
    wizardEngine.setCurrentState({
        currentPage: wizardPage,
        nextPage: "page-access-token",
        backPage: null,
        back: false,
        next: true,
        cancel: true
    });

}

export {
    factory,
    _registerRouteCallback
};