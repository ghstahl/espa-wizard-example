import * as wizardEngine from "./wizard-engine.js"
import {
    factory as factoryWizardListener
} from "../services/wizard-listener.js"
import {
    factory as factoryWizardPage
} from '../services/wizard-page.js';
import {
    bindEvents
} from '../utils.js';
//TODO: consolidate api-client-services and fetch-service
import * as fetchService from "../services/fetch-service.js";
import {
    get as getRequest,
    post as postRequest
} from "./api-client-services.js"
import {
    get, set
} from '../services/state-machine.js';

window.ESPA.plugins = window.ESPA.plugins || {};
window.ESPA.plugins.wizardEngine = wizardEngine;
window.ESPA.plugins.factoryWizardListener = factoryWizardListener;
window.ESPA.plugins.factoryWizardPage = factoryWizardPage;
window.ESPA.plugins.bindEvents = bindEvents;
window.ESPA.plugins.fetchService = fetchService;
window.ESPA.plugins.getRequest = getRequest;
window.ESPA.plugins.postRequest = postRequest;
window.ESPA.plugins.state = {
    get: get,
    set: set
}