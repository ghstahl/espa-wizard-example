export function fetchIdToken() {
    let details = {
        'grant_type': "arbitrary_identity",
        'client_id': "arbitrary-resource-owner-client",
        'client_secret': "secret",
        'scope': "wizard",
        'arbitrary_claims': "{'preferred_username': ['porky@pig.com'],'name': ['porky@pig.com']}",
        'subject': "PorkyPig",
        'arbitrary_amrs': "['agent:username:agent0@supporttech.com','agent:challenge:fullSSN','agent:challenge:homeZip']",
        'arbitrary_audiences': "['cat','dog']",
        'custom_payload': "{'b':['cat','dog'],'a': {'0': {'Street1': '0 Montana Ave','Street2': null,'Street3': null,'Zip': '90403','City': 'Santa Monica','State': 'California','Country': 'USA'},'1': {'Street1': '1 Montana Ave','Street2': null,'Street3': null,'Zip': '90403','City': 'Santa Monica','State': 'California','Country': 'USA'}}}"
    };

    let formBody = [];
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    // do a thing, possibly async, then…
    return ESPA.plugins.fetchService.fetch('https://p7identityserver4.azurewebsites.net/connect/token', {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json"
        },
        body: formBody
    })
}
export function bind(id_token) {
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
    return ESPA.plugins.fetchService.fetch('https://wizardappapi.azurewebsites.net/api/Identity/bind', {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Accept": "application/json"
        },
        body: formBody
    })
}
export function fetchIdentity(access_token) {
    // do a thing, possibly async, then…
    return ESPA.plugins.fetchService.fetch('https://wizardappapi.azurewebsites.net/api/Identity/closed', {
        headers: {
            "Authorization": "Bearer " + access_token,
            "x-authScheme": "One"
        },
    })
}
export function fetchEntitlements(access_token) {
    // do a thing, possibly async, then…
    return ESPA.plugins.fetchService.fetch('https://wizardappapi.azurewebsites.net/api/RemoteJsonFile/closed?file=entitlements.json', {
        headers: {
            "Authorization": "Bearer " + access_token,
            "x-authScheme": "One"
        },
    })
}