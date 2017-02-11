// Cache will time out after 20 minutes
var releaseCacheTimeMillis = 20 * 60 * 1000;

var releasePlatformRegexes = {
    ev3: /ev3dev-jessie-ev3-generic-[\d-]+\.zip/,
    rpi: /ev3dev-jessie-rpi-generic-[\d-]+\.zip/,
    rpi2: /ev3dev-jessie-rpi2-generic-[\d-]+\.zip/,
    bone: /ev3dev-jessie-bone-generic-[\d-]+\.zip/,
}

function loadReleasesByPlatform(successCallback, errorCallback, clearCache) {
    getApiValue('https://api.github.com/repos/ev3dev/ev3dev/releases', releaseCacheTimeMillis, function (releasesApiData, error) {
        if (error) {
            errorCallback(error);
            return;
        }

        var releaseMap = {};
        releasesApiData.forEach(function (releaseApiData) {
            releaseApiData['assets'].forEach(function (assetApiData) {
                var assetPlatform = $.grep(Object.keys(releasePlatformRegexes), function (platId) {
                    return releasePlatformRegexes[platId].test(assetApiData['name']);
                })[0];

                if (!assetPlatform)
                    return true;

                if (!Array.isArray(releaseMap[assetPlatform]))
                    releaseMap[assetPlatform] = [];

                releaseMap[assetPlatform].push({
                    releaseName: releaseApiData['name'],
                    creationDate: Date.parse(releaseApiData['created_at']),
                    platform: assetPlatform,
                    size: assetApiData['size'],
                    downloadUrl: assetApiData['browser_download_url']
                });
            });
        });

        Object.keys(releaseMap).forEach(function (platformId) {
            releaseMap[platformId].sort(function (a, b) {
                return (b.creationDate > a.creationDate) - (b.creationDate < a.creationDate);
            });
        })

        successCallback(releaseMap);
    }, clearCache);
}

function initDownloadLinks(clearCache) {
    loadReleasesByPlatform(function (releaseMap) {

        $('a[data-release-link-platform]').each(function (i, element) {
            var $linkElem = $(element);
            var targetReleasePlatform = $linkElem.data('release-link-platform');
            var targetRelease = (releaseMap[targetReleasePlatform] || [])[0];

            if (!targetRelease) {
                console.error('"' + targetReleasePlatform + '" is an invalid release target or no releases for the given platform exist.');
                return true;
            }

            $linkElem.attr('href', targetRelease.downloadUrl);
            $linkElem.children('small.download-size-label').remove();

            var fileSize = targetRelease.size >> 20;
            $('<small/>').addClass('download-size-label').text(' (' + fileSize + ' MiB)').appendTo($linkElem);
        });
    },
    function (error) {
        console.error("Download links not available! Falling back to static content.");
        $('.release-link-container').hide();
        $('.release-link-alt').show();
    }, clearCache);
}

$(document).ready(function () {
    // If JS is disabled, this code will never run and the alt content will be left as-is.
    // We do this as soon as the document loads so that the page flash is minimal.
    $('.release-link-alt').hide();
    $('.release-link-container').show();

    if ($('a[data-release-link-platform]').length > 0) {
        initDownloadLinks();
    }

    $('a.release-refresh-button').click(function() {
        initDownloadLinks(true);
    });
});