import {
    factory as factoryWizardContainer
} from '../controllers/wizard-container.js';
import {
    factory as factoryFoo
} from '../controllers/foo.js';
import {
    factory as factoryBar
} from '../controllers/bar.js';
import {
    factory as factoryPageOne
} from '../controllers/page-one.js';
import {
    factory as factoryPagetwo
} from '../controllers/page-two.js';
import {
    factory as factoryPageAccessToken
} from '../controllers/page-access-token.js';
import {
    factory as factoryPageIdToken
} from '../controllers/page-id-token.js';

export function registerRoutes() {
    //your routes here
    factoryWizardContainer();
    factoryFoo();
    factoryBar();
    factoryPageOne();
    factoryPagetwo();
    factoryPageAccessToken();
    factoryPageIdToken();
    //reset the default route
    ESPA.navigate('/');
}