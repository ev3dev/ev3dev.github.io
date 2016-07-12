var cacheKey = "api-cache";

function supportsHtml5Storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

function getApiValue(endpointUrl, cacheTime, callback) {
    try {
        var cacheData = supportsHtml5Storage() ? JSON.parse(localStorage[cacheKey]) : null;
        // This does an exact match for the URL given. Different spacing, duplicate slashes,
        // alternate caps, etc. will result in the cache being bypassed.
        if (cacheData && cacheData[endpointUrl] && Date.now() - cacheData[endpointUrl].dateRetrieved < cacheTime) {
            callback(cacheData[endpointUrl].requestResult);
            return;
        }
    }
    catch (e) {
        // Ignore the error; if the saved JSON is invalid, we'll just request it from the server.
    }
    
    console.log('No cached copy of API data for endpoint "' + endpointUrl  + '" found. Downloading from remote server.');
    $.ajax(endpointUrl).done(function (apiData) {
        if (supportsHtml5Storage()) {
            var cacheData = {};
            
            try {
                cacheData = JSON.parse(localStorage[cacheKey]);
            }
            catch(e) {
                // Ignore error; either the cache doesn't exist or it is invalid
            }
            
            cacheData[endpointUrl] = {
                dateRetrieved: Date.now(),
                requestResult: apiData
            };
            
            localStorage.setItem(cacheKey, JSON.stringify(cacheData));
        }
        
        callback(apiData);
    }).fail(function (xhr, error) {
        console.error("Error getting API data: " + error);
        callback(null, error);
    });
}