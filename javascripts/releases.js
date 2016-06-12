var ev3devRepoReleaseCacheKey = 'ev3dev-repo-release-cache';
// Cache will time out after 20 minutes
var releaseCacheTimeMillis = 20 * 60 * 1000;

var releasePlatformRegexes = {
    ev3: "ev3-[\\w\\d-]*\\.img\\.xz",
    rpi: "rpi-[\\w\\d-]*\\.img\\.xz",
    rpi2: "rpi2-[\\w\\d-]*\\.img\\.xz",
    evb: "evb-[\\w\\d-]*\\.img\\.xz",
}

function supportsHtml5Storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

$(document).ready(function () {
    if ($('a[data-release-link-platform]').length > 0) {
        function initReleaseLinks(releases) {
            releases.sort(function (a, b) {
                if (Date.parse(a['created_at']) < Date.parse(b['created_at']))
                    return 1;
                if (Date.parse(a['created_at']) > Date.parse(b['created_at']))
                    return -1;

                return 0;
            });

            $('a[data-release-link-platform]').each(function (i, element) {
                var $linkElem = $(element);
                var targetReleasePlatform = $linkElem.data('release-link-platform');
                if(!releasePlatformRegexes[targetReleasePlatform]) {
                    console.error('"' + targetReleasePlatform + '" is an invalid release target.');
                    return true;
                }
                
                var platformRegex = new RegExp(releasePlatformRegexes[targetReleasePlatform]);

                for(var releaseIndex in releases) {
                    var releaseAssets = releases[releaseIndex].assets;
                    for(var assetIndex in releaseAssets) {
                        if(platformRegex.test(releaseAssets[assetIndex].name)) {
                            $linkElem.attr('href', releaseAssets[assetIndex]['browser_download_url']);
                            return true;
                        }
                    }
                }
            });
        }

        var cacheData;
        try {
            cacheData = supportsHtml5Storage() ? JSON.parse(localStorage.getItem(ev3devRepoReleaseCacheKey)) : null;
        }
        catch(e) {
            // Ignore the error; if the saved JSON is invalid, we'll just request it from the server.
        }
        
        if (cacheData && Date.now() - cacheData.dateRetrieved < releaseCacheTimeMillis) {
            initReleaseLinks(cacheData.releaseData);
        }
        else {
            console.log("No cached copy of releases found. Downloading from GitHub.");
            $.ajax('https://api.github.com/repos/ev3dev/ev3dev/releases').done(function (releases) {
                if (supportsHtml5Storage())
                    localStorage.setItem(ev3devRepoReleaseCacheKey, JSON.stringify({
                        dateRetrieved: Date.now(),
                        releaseData: releases
                    }));
                initReleaseLinks(releases);
            }).fail(function (error) {
                console.error("Error getting release info: " + error);
            });
        }
    }
});