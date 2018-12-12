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
    setState,
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
    setState({}); // make sure that something is in the store for state.
    var state = getState();
    registerApiHosts();
    registerRoutes();
    //reset the default route
    ESPA.navigate('/');

    //auto start the first route

    state.main = "started";
    ESPA.navigate('wizard-container');
}