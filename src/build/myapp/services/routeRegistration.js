 import {
     factory as factoryWizardContainer
 } from '../controllers/wizard-container.js';

 import {
     factory as factoryPageOne
 } from '../controllers/page-one.js';
 import {
     factory as factoryPagetwo
 } from '../controllers/page-two.js';
 import {
     factory as factoryPageThree
 } from '../controllers/page-three.js';
 import {
     factory as factoryPageAccessToken
 } from '../controllers/page-access-token.js';
 import {
     factory as factoryPageIdToken
 } from '../controllers/page-id-token.js';

 export function registerRoutes() {
     //your routes here
     factoryWizardContainer();

     factoryPageOne();
     factoryPagetwo();
     factoryPageThree();
     factoryPageAccessToken();
     factoryPageIdToken();

 }