 import {
     apiService
 } from "./api-client-services.js"
 export function registerApiHosts() {
     apiService.registerHost('local', 'http://localhost:8888/')
     apiService.registerHost('wizardappapi', 'https://wizardappapi.azurewebsites.net')
 }