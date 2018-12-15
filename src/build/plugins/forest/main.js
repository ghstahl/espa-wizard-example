import {
    factory as factoryPageForest
} from './controllers/page-forest.js';
import {
    factory as factoryPageAccessToken
} from './controllers/page-access-token.js';
import {
    factory as factoryPageEntitlements
} from './controllers/page-entitlements.js';
factoryPageForest();
factoryPageAccessToken();
factoryPageEntitlements();