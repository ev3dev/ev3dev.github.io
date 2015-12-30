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
    if(arguments.length == 2) {
        var newHash = {};
        newHash[arguments[0]] = arguments[1];
        dataHash = newHash;
    }
    
    return function () {
        var currentTarget = $(this);
        return Object.keys(dataHash).every(function(property) {
            return currentTarget.data(property) == dataHash[property];
        });
    }
}

function switchSelectedPlatformAttribute(platformAttributeName, newAttributeValue) {
    // Containers of platform content should have .platform-content-item
    // Containers of platform content should have data-platform-attribute-name and data-platform-attribute-value
    $('.platform-content-item')
        .filter(getFilterByData('platform-attribute-name', platformAttributeName))
        .hide()
        .filter(getFilterByData('platform-attribute-value', newAttributeValue))
        .show();
    
    $('.platform-attribute-select-group')
        .filter(getFilterByData('target-platform-attribute-name', platformAttributeName))
        .children()
        .removeClass('active')
        .filter(getFilterByData('platform-attribute-value', newAttributeValue))
        .addClass('active');
    
    // TODO: Save current option to local storage
}

function addPlatformNavItem(platformAttributeName, newAttributeValue) {    
    // Container for pills should have .platform-attribute-select-group and data-target-platform-attribute-name
    var $platNav = $('.platform-attribute-select-group')
        .filter(getFilterByData('target-platform-attribute-name', platformAttributeName));

    if ($platNav.length <= 0) {
        $platNav = $('<ul class="nav nav-pills platform-attribute-select-group"/>')
            .data('target-platform-attribute-name', platformAttributeName);
        $platNav.insertAfter($('.page-header'));
    }
    else if($platNav.children().filter(getFilterByData('platform-attribute-value', newAttributeValue)).length > 0) {
        // If there are any pills that have already been created for this value, we are done
        return;
    }

    var $pillItem = $('<li/>')
        .data('platform-attribute-value', newAttributeValue)
        .addClass('platform-select-link');
        
    // TODO: Use text lookup and data file
    $('<a/>').text(newAttributeValue).appendTo($pillItem);

    $pillItem.click(function () {
        switchSelectedPlatformAttribute(platformAttributeName, newAttributeValue);
    })

    $platNav.append($pillItem);
}

$(document).ready(function () {    
    $('ul[data-platform-select-list-attribute]').each(function (i, platformUl) {
        var $platformUl = $(platformUl);
        var targetAttribute = $platformUl.data('platform-select-list-attribute');
        
        var $platformContentContainer = $('<div/>');
        $platformContentContainer.insertBefore($platformUl);

        $platformUl.detach();
        
        $platformUl.children('li[data-platform-attribute-value]').each(function (i, platformLi) {
            var $platformLi = $(platformLi);
            var currentPlatformAttributeValue = $platformLi.data('platform-attribute-value');

            var $newPlatformContentItem = $('<div/>').addClass("platform-content-item");
            $newPlatformContentItem.attr('id', 'plat-' + cleanTextForId(targetAttribute) + '-' + cleanTextForId(currentPlatformAttributeValue));
            $newPlatformContentItem.data({
                'platform-attribute-name': targetAttribute,
                'platform-attribute-value': currentPlatformAttributeValue
            });

            $newPlatformContentItem.append($platformLi.contents().detach());
            $newPlatformContentItem.appendTo($platformContentContainer);

            addPlatformNavItem(targetAttribute, currentPlatformAttributeValue);
        });

        // TODO: Add ability to nest options (as dropdown)
    });
    
    $('.platform-attribute-select-group').each(function() {
        var attributeName = $(this).data('target-platform-attribute-name');
        // TODO: URL param
        // TODO: lookup UA string
        // TODO: HTML storage
        
        var defaultValue = $(this)
            .children(':first')
            .data('platform-attribute-value');
        
        switchSelectedPlatformAttribute(attributeName, defaultValue);
    })
});
