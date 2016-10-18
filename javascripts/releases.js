// Cache will time out after 20 minutes
var releaseCacheTimeMillis = 20 * 60 * 1000;

var releasePlatformRegexes = {
    ev3: "ev3dev-jessie-ev3-generic-[\\d-]+\\.zip",
    rpi: "ev3dev-jessie-rpi-generic-[\\d-]+\\.zip",
    rpi2: "ev3dev-jessie-rpi2-generic-[\\d-]+\\.zip",
    bone: "ev3dev-jessie-bone-generic-[\\d-]+\\.zip",
}

function initDownloadLinks() {
    getApiValue('https://api.github.com/repos/ev3dev/ev3dev/releases', releaseCacheTimeMillis, function (releases, error) {
        if(error) {
            console.error("Download links not available! Falling back to static content.");
            $('.release-link-container').hide();
            $('.release-link-alt').show();
            
            return;
        }
        
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
            if (!releasePlatformRegexes[targetReleasePlatform]) {
                console.error('"' + targetReleasePlatform + '" is an invalid release target.');
                return true;
            }

            var platformRegex = new RegExp(releasePlatformRegexes[targetReleasePlatform]);

            for (var releaseIndex in releases) {
                var releaseAssets = releases[releaseIndex].assets;
                for (var assetIndex in releaseAssets) {
                    if (platformRegex.test(releaseAssets[assetIndex].name)) {
                        $linkElem.attr('href', releaseAssets[assetIndex]['browser_download_url']);
                        var fileSize = releaseAssets[assetIndex]['size'] >> 20;
                        $('<small/>').text('(' + fileSize.toFixed(1) + ' MiB)').appendTo($linkElem);
                        return true;
                    }
                }
            }
        });
    });
}

$(document).ready(function () {
    // If JS is disabled, this code will never run and the alt content will be left as-is.
    // We do this as soon as the document loads so that the page flash is minimal.
    $('.release-link-alt').hide();
    $('.release-link-container').show();
    
    if ($('a[data-release-link-platform]').length > 0) {
        initDownloadLinks();
    }
});