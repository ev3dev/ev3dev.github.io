---

---

// Loaded from _data/platform-attributes.json
var platformAttributes = {{ site.data.platform-attributes | jsonify }};

var autodetectFunctions = {
    autodetectClientPlatform: function () {
        var clientPlatformValues = platformAttributes["client-platform"].values;
        for(var platformId in clientPlatformValues) {
            if(clientPlatformValues[platformId].uaPlatform === $.ua.os.name)
                return platformId;
        }
        
        return null;
    }
}

function supportsHtml5Storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

function cleanTextForId(text) {
    return text.replace(/\W+/g, '-');
}

function getFilterByData(dataHash) {
    if (arguments.length == 2) {
        var newHash = {};
        newHash[arguments[0]] = arguments[1];
        dataHash = newHash;
    }

    return function () {
        var currentTarget = $(this);
        return Object.keys(dataHash).every(function (property) {
            return currentTarget.data(property) == dataHash[property];
        });
    }
}

function switchSelectedPlatformAttribute(platformAttributeName, newAttributeValue) {
    // Containers of platform content should have .platform-content-item
    // Containers of platform content should have data-platform-attribute-name and data-platform-attribute-value-id
    $('.platform-content-item')
        .filter(getFilterByData('platform-attribute-name', platformAttributeName))
        .hide()
        .filter(getFilterByData('platform-attribute-value-id', newAttributeValue))
        .show();

    $('.platform-attribute-select-group')
        .filter(getFilterByData('target-platform-attribute-name', platformAttributeName))
        .children()
        .removeClass('active')
        .filter(getFilterByData('platform-attribute-value-id', newAttributeValue))
        .addClass('active');
    
    // TODO: Save current option to local storage
}

function addPlatformNavItem(platformAttributeId, newAttributeValueId) {    
    // Container for pills should have .platform-attribute-select-group and data-target-platform-attribute-name
    var $platNav = $('.platform-attribute-select-group')
        .filter(getFilterByData('target-platform-attribute-name', platformAttributeId));

    if ($platNav.length <= 0) {
        $platNav = $('<ul class="nav nav-pills platform-attribute-select-group"/>')
            .data('target-platform-attribute-name', platformAttributeId);
        $platNav.insertAfter($('.page-header'));
    }
    else if ($platNav.children().filter(getFilterByData('platform-attribute-value-id', newAttributeValueId)).length > 0) {
        // If there are any pills that have already been created for this value, we are done
        return;
    }

    var $pillItem = $('<li/>')
        .data('platform-attribute-value-id', newAttributeValueId)
        .addClass('platform-select-link');


    var platformAttributeMetadata = platformAttributes[platformAttributeId];
    var newAttributeValueMetadata = platformAttributeMetadata.values[newAttributeValueId];
    $('<a/>').text(newAttributeValueMetadata.title).appendTo($pillItem);

    $pillItem.click(function () {
        switchSelectedPlatformAttribute(platformAttributeId, newAttributeValueId);
    })

    $platNav.append($pillItem);
}

function getInitialValueId(attributeId) {
    var messageBase = "Selected value for property " + attributeId + " from ";

    var htmlStorageValue, autodetectFunctionName, autodetectValue;
    var urlParamValue = $(document).getUrlParam(attributeId);

    if (urlParamValue) {
        console.log(messageBase + "URL param");

        return urlParamValue;
    }
    else if (supportsHtml5Storage() && (htmlStorageValue = localStorage.getItem(attributeId))) {
        console.log(messageBase + "HTML5 local storage");

        return htmlStorageValue;
    }
    else if ((autodetectFunctionName = platformAttributes[attributeId].autodetectFunction)
        && (autodetectValue = autodetectFunctions[autodetectFunctionName]())) {

        console.log(messageBase + "autodetect function");

        return autodetectValue;
    }
    else {
        console.log(messageBase + "default first option");

        return $('.platform-attribute-select-group')
            .filter(getFilterByData('target-platform-attribute-name', attributeId))
            .children(':first')
            .data('platform-attribute-value-id');
    }
}

$(document).ready(function () {
    $('ul[data-platform-select-list-attribute]').each(function (i, platformUl) {
        var $platformUl = $(platformUl);
        var targetAttributeId = $platformUl.data('platform-select-list-attribute');

        var $platformContentContainer = $('<div/>');
        $platformContentContainer.insertBefore($platformUl);

        $platformUl.detach();

        $platformUl.children('li[data-platform-attribute-value-id]').each(function (i, platformLi) {
            var $platformLi = $(platformLi);
            var currentPlatformAttributeValueId = $platformLi.data('platform-attribute-value-id');

            var $newPlatformContentItem = $('<div/>').addClass("platform-content-item");
            $newPlatformContentItem.attr('id', 'plat-' + cleanTextForId(targetAttributeId) + '-' + cleanTextForId(currentPlatformAttributeValueId));
            $newPlatformContentItem.data({
                'platform-attribute-name': targetAttributeId,
                'platform-attribute-value-id': currentPlatformAttributeValueId
            });

            $newPlatformContentItem.append($platformLi.contents().detach());
            $newPlatformContentItem.appendTo($platformContentContainer);

            addPlatformNavItem(targetAttributeId, currentPlatformAttributeValueId);
        });

        // TODO: Add ability to nest options (as dropdown)
    });

    $('.platform-attribute-select-group').each(function () {
        var attributeName = $(this).data('target-platform-attribute-name');
        // TODO: URL param
        // TODO: lookup UA string
        // TODO: HTML storage
        
        var initialValueId = getInitialValueId(attributeName);

        switchSelectedPlatformAttribute(attributeName, initialValueId);
    })
});
