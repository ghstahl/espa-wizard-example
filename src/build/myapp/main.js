import '../../../node_modules/espa/barebone.js';
import {
    polyfill
} from './utils.js';
import {
    registerApiHosts
} from './services/hostRegistration.js';
import {
    registerRoutes
} from './services/routeRegistration.js';
import {
    getState
} from './services/state-machine.js';

ESPA.store.set('app/context/name', 'myapp');
if (!ESPA.store.get('app/context/mode')) {
    ESPA.store.set('app/context/mode', 'non-test');
}

if (ESPA.store.get('app/context/mode') === 'non-test') {
    polyfill([
        'Object.assign',
        'Object.defineProperties',
        'Object.entries',
        'Object.keys',
        'Object.values',
        'fetch',
        'Promise'
    ], _main);
}

function _main() {
    registerApiHosts();
    registerRoutes();
    //auto start the first route
    var state = getState();
    state.main = "started";
    ESPA.navigate('wizard-container');
}