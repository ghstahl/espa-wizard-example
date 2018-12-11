 import {
    registerHost
 } from "./api-client-services.js"
 export function registerApiHosts() {
     registerHost('local', 'http://localhost:8888/')
     registerHost('wizardappapi', 'https://wizardappapi.azurewebsites.net')
 }