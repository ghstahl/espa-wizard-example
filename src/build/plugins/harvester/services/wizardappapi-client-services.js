export function fetchProductHarvest(partialUrl) {
    // do a thing, possibly async, then…
    var url = `https://wizardappapi.azurewebsites.net/api/RemoteJsonFile/open?file=${partialUrl}`;
    return ESPA.plugins.fetchService.fetch(url);
}
 