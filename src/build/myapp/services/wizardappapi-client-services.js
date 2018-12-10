import * as fetchService from "./fetch-service.js";

export async function bind(id_token) {
    let details = {
        'id_token': id_token
    };

    let formBody = [];
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    // do a thing, possibly async, then…
    return fetchService.fetch('https://wizardappapi.azurewebsites.net/api/Identity/bind', {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json"
        },
        body: formBody
    })
}
export async function fetchIdentity(access_token) {
    // do a thing, possibly async, then…
    return fetchService.fetch('https://wizardappapi.azurewebsites.net/api/Identity/closed', {
        headers: {
            "Authorization": "Bearer " + access_token,
            "x-authScheme": "One"
        },
    })
}
export async function fetchEntitlements(access_token) {
    // do a thing, possibly async, then…
    return fetchService.fetch('https://wizardappapi.azurewebsites.net/api/RemoteJsonFile/closed?file=entitlements.json', {
        headers: {
            "Authorization": "Bearer " + access_token,
            "x-authScheme": "One"
        },
    })
}