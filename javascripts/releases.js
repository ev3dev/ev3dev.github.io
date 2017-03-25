// Cache will time out after five minutes
var releaseCacheTimeMillis = 5 * 60 * 1000;

var releasePlatformRegexes = {
    ev3: /ev3dev-jessie-ev3-generic-[\d-]+\.zip/,
    rpi: /ev3dev-jessie-rpi-generic-[\d-]+\.zip/,
    rpi2: /ev3dev-jessie-rpi2-generic-[\d-]+\.zip/,
    bone: /ev3dev-jessie-bone-generic-[\d-]+\.zip/,
}

function loadReleasesByPlatform(successCallback, errorCallback) {
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
                    assetName: assetApiData['name'],
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
    });
}

function initDownloadLinks() {
    loadReleasesByPlatform(function (releaseMap) {

        $('a[data-download-button-platform]').each(function (i, element) {
            var $linkElem = $(element);
            var targetReleasePlatform = $linkElem.data('download-button-platform');
            var targetRelease = (releaseMap[targetReleasePlatform] || [])[0];

            if (!targetRelease) {
                console.error('"' + targetReleasePlatform + '" is an invalid release target or no releases for the given platform exist.');
                return true;
            }

            $linkElem.attr('href', targetRelease.downloadUrl);
            $linkElem.addClass('btn-group-vertical download-button-container');

            var $upperSection = $linkElem.children('.download-button-upper');
            if($upperSection.length <= 0) {
                var $contents = $linkElem.contents();
                $upperSection = $('<span/>').addClass('btn btn-lg btn-primary download-button-upper').appendTo($linkElem);
                $contents.appendTo($upperSection);
            }

            $linkElem.children('.download-button-lower').remove();
            var $lowerSection = $('<span/>').addClass('btn download-button-lower').text(targetRelease.assetName).appendTo($linkElem);

            var fileSize = targetRelease.size >> 20;
            $('<small/>').addClass('download-info-label badge').text(fileSize + ' MiB').appendTo($lowerSection);

        });
    },
    function (error) {
        console.error("Download links not available! Falling back to static content.");
        $('.release-link-container').hide();
        $('.release-link-alt').show();
    });
}

$(document).ready(function () {
    // If JS is disabled, this code will never run and the alt content will be left as-is.
    // We do this as soon as the document loads so that the page flash is minimal.
    $('.release-link-alt').hide();
    $('.release-link-container').show();

    if ($('a[data-download-button-platform]').length > 0) {
        initDownloadLinks();
    }
});