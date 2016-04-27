---

---

// Loaded from _data/platform-attributes.json
var platformAttributes = {{ site.data.platform-attributes | jsonify }};

var autodetectFunctions = {
    autodetectClientPlatform: function () {
        var clientPlatformValues = platformAttributes["client-platform"].values;
        for (var platformId in clientPlatformValues) {
            if (clientPlatformValues[platformId].uaPlatform === $.ua.os.name)
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

function createObjectTree(objectRef) {
    var lastRef = objectRef;
    for(var i = 1; i < arguments.length; i++) {
        if(!lastRef[arguments[i]])
            lastRef[arguments[i]] = {};
        
        lastRef = lastRef[arguments[i]];
    }
}

function switchSelectedPlatformAttribute(platformAttributeName, newAttributeValue) {
    // Containers of platform content should have .platform-content-item
    // Containers of platform content should have data-platform-attribute-name and data-platform-attribute-value-id
    
    // Show only the content for the new value and hide the rest
    $('.platform-content-item')
        .filter(getFilterByData('platform-attribute-name', platformAttributeName))
        .hide()
        .filter(getFilterByData('platform-attribute-value-id', newAttributeValue))
        .show();

    // Mark any selection UI objects that represent this value as active and unmark the others
    $('.platform-attribute-select-group, .platform-nested-select-group')
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

function addNestedPlatformNavItem(platformAttributeId, newAttributeValueId, parentAttributeId, parentAttributeValueId) {
    addPlatformNavItem(parentAttributeId, parentAttributeValueId);

    // TODO: Use dividers to handle multiple nested attributes
    // ...or at least blow up loudly

    var $parentPillLi = $('.platform-attribute-select-group')
        .filter(getFilterByData('target-platform-attribute-name', parentAttributeId))
        .children()
        .filter(getFilterByData('platform-attribute-value-id', parentAttributeValueId));

    var $selectGroupDropdown = $parentPillLi.children('ul.platform-nested-select-group');

    if ($selectGroupDropdown.length <= 0) {
        $parentPillLi.addClass('dropdown');

        var $parentLinkAnchor = $parentPillLi.children('a')
            .addClass('dropdown-toggle')
            .attr('data-toggle', 'dropdown')
            .attr('role', 'button')
            .append('<span class="caret"></span>');

        $selectGroupDropdown = $('<ul/>')
            .addClass('dropdown-menu')
            .addClass('platform-nested-select-group')
            .data('target-platform-attribute-name', platformAttributeId)
            .insertAfter($parentLinkAnchor);
    }
    else if ($selectGroupDropdown.children('li.nested-platform-select-link').filter(getFilterByData('platform-attribute-value-id', newAttributeValueId)).length > 0) {
        return;
    }
    
    var $newDropdownItem = $('<li/>')
        .data('platform-attribute-value-id', newAttributeValueId)
        .addClass('nested-platform-select-link')
        .appendTo($selectGroupDropdown);
    
    var platformAttributeMetadata = platformAttributes[platformAttributeId];
    var newAttributeValueMetadata = platformAttributeMetadata.values[newAttributeValueId];
    
    $('<a/>').text(newAttributeValueMetadata.title).appendTo($newDropdownItem);
    
    $newDropdownItem.click(function () {
        switchSelectedPlatformAttribute(platformAttributeId, newAttributeValueId);
    })
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

        return $('.platform-attribute-select-group, .platform-nested-select-group')
            .filter(getFilterByData('target-platform-attribute-name', attributeId))
            .children(':first')
            .data('platform-attribute-value-id');
    }
}

function expandPlatformSelectList($platformUl, parentInfo) {
    var targetAttributeId = $platformUl.data('platform-select-list-attribute');
        
    var $platformContentContainer = $('<div/>');
    $platformContentContainer.insertBefore($platformUl);

    if(!!parentInfo) {
        $platformContentContainer.addClass("nested-platform-select");
    }

    $platformUl.detach();

    // TODO: Either use the value data that has already been generated or don't generate it
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

        if(!!parentInfo)
            addNestedPlatformNavItem(targetAttributeId, currentPlatformAttributeValueId, parentInfo.attributeId, parentInfo.valueId);
        else
            addPlatformNavItem(targetAttributeId, currentPlatformAttributeValueId);
    });
}

$(document).ready(function () {
    
    var platformAttributeMapping = {};
    var usedPlatformAttributes = [];
    
    $('ul[data-platform-select-list-attribute]').each(function (i, platformUl) {
        var $platformUl = $(platformUl);
        var targetAttributeId = $platformUl.data('platform-select-list-attribute');

        usedPlatformAttributes.push(targetAttributeId);

        var $parentPlatformValueLi = $platformUl.parents('[data-platform-attribute-value-id]');
        var $parentPlatformUl = $parentPlatformValueLi.parents('[data-platform-select-list-attribute]');
        var isNestedContent = $parentPlatformUl.length > 0;

        var attributeMappingObject;
        if(isNestedContent) {
            var parentAttributeId = $parentPlatformUl.data('platform-select-list-attribute');
            var parentAttributeValueId = $parentPlatformValueLi.data('platform-attribute-value-id');
            
            createObjectTree(platformAttributeMapping, parentAttributeId, "values", parentAttributeValueId, "nestedAttributes", targetAttributeId);
            
            attributeMappingObject = platformAttributeMapping[parentAttributeId]
                .values[parentAttributeValueId]
                .nestedAttributes[targetAttributeId];
        }
        else {
            if(!platformAttributeMapping[targetAttributeId])
                platformAttributeMapping[targetAttributeId] = {};
                
            attributeMappingObject = platformAttributeMapping[targetAttributeId];
        }
        
        $platformUl.attr('id', 'plat-' + cleanTextForId(targetAttributeId));
        attributeMappingObject.domId = $platformUl.attr('id');
        attributeMappingObject.values = {};

        $platformUl.children('li[data-platform-attribute-value-id]').each(function (i, platformLi) {
            var $platformLi = $(platformLi);
            var currentPlatformAttributeValueId = $platformLi.data('platform-attribute-value-id');
            
            $platformLi.attr('id', 'plat-' + cleanTextForId(targetAttributeId) + '-' + cleanTextForId(currentPlatformAttributeValueId));

           attributeMappingObject.values[currentPlatformAttributeValueId] = {
               domId: $platformLi.attr('id')
           };
        });
    });
    
    for (var attributeId in platformAttributeMapping) {
        var attributeObj = platformAttributeMapping[attributeId];

        var $platformUl = $('#' + attributeObj.domId);
        expandPlatformSelectList($platformUl);

        for (var valueId in attributeObj.values) {

            if (!!attributeObj.values[valueId].nestedAttributes) {
                for (var nestedAttributeId in attributeObj.values[valueId].nestedAttributes) {
                    var attributeObj = attributeObj.values[valueId].nestedAttributes[nestedAttributeId];

                    var $nestedPlatformUl = $('#' + attributeObj.domId);
                    expandPlatformSelectList($nestedPlatformUl, { attributeId: attributeId, valueId: valueId });
                }
            }
        }
    }

    for(var i = 0; i < usedPlatformAttributes.length; i++) {
        var attributeName = usedPlatformAttributes[i];
        // TODO: URL param
        // TODO: lookup UA string
        // TODO: HTML storage
        
        var initialValueId = getInitialValueId(attributeName);

        switchSelectedPlatformAttribute(attributeName, initialValueId);
    }
});
