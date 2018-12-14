import {
    factory as factoryPageHarvest
} from './controllers/page-harvest.js';

factoryPageHarvest();

//Make sure to set proper env for your main
ESPA.plugins = ESPA.plugins || {};
ESPA.plugins.env = 'prod';