import '../../../node_modules/espa/barebone.js';
import './services/plugin-core.js';
import {
    polyfill
} from './utils.js';
import {
    registerApiHosts
} from './services/hostRegistration.js';
import {
    registerRoutes
} from './services/routeRegistration.js';
import './services/plugin-registration.js';

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
    ], main);
}

export function main() {
    ESPA.plugins.state.set({}); // make sure that something is in the store for state.
    var state = ESPA.plugins.state.get();
    registerApiHosts();
    registerRoutes();
    //reset the default route
    ESPA.navigate('/');

    //auto start the first route

    state.main = "started";
    ESPA.navigate('wizard-container');
}