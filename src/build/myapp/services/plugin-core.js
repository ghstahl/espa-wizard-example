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
import pluginsMetadata from '../plugins-discovery.json!';

window.ESPA.plugins = window.ESPA.plugins || {};
window.ESPA.plugins.wizardEngine = wizardEngine;
window.ESPA.plugins.factoryWizardListener = factoryWizardListener;
window.ESPA.plugins.factoryWizardPage = factoryWizardPage;
window.ESPA.plugins.bindEvents = bindEvents;
window.ESPA.plugins.fetchService = fetchService;
window.ESPA.plugins.getRequest = getRequest;
window.ESPA.plugins.postRequest = postRequest;
window.ESPA.plugins.metaData = pluginsMetadata;
window.ESPA.plugins.state = {
    get: get,
    set: set
}
window.ESPA.plugins.load = function(plugin) {
    let pluginDiscoveryUrl = '';
    if (window.ESPA.plugins.env !== 'prod') {
        pluginDiscoveryUrl = ESPA.plugins.metaData[plugin].dev;
    } else {
        pluginDiscoveryUrl = ESPA.plugins.metaData[plugin].prod;
    }
    
    return ESPA.plugins.fetchService.fetch(pluginDiscoveryUrl)    
    .then(function(data) {
        const url = data.json['wizard-package-url'];
        if (!url) {
            throw new Error('plugin url is missing');
        }
        if (ESPA.plugins.env !== 'prod') {
            ESPA.logger.debug('dev env detected. Bypass loading plugin...');
            return Promise.resolve(data);
        } else {
            ESPA.logger.debug('Start loading plugin url: ' + url);
            return ESPA.loadResource.js(url);
        }
    })
    .catch(function(e) {
        ESPA.logger.error(e);        
        return 'fail to discover plugin url';
    });
}