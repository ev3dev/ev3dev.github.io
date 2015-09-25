// Function to handle tabs from the /_includes/tabs.html template.

function supports_html5_storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

$(document).ready(function () {
    $('ul[tab-list]').each(function (i, element) {
        var $list = $(element);
        $list.wrap('<div tab-area="' + i + '"></div>');
        var $tabContentArea = $('<div tab-content-area="' + i +'"></div>');
        $tabContentArea.insertAfter ($list);
        $list.children('li[tab]').each(function (i, element) {
            var $tab = $(element);
            var tabValue = $tab.attr('tab');
            var $content = $tab.contents().detach();
            $tab.text(tabValue);
            $tabContentArea.append($content);
            $content.wrapAll('<div tab-content="' + tabValue + '"></div>');
        });
    });
    $('div[tab-area]').each(function (i, element) {
        var $tabArea = $(element);
        var tabAreaValue = $tabArea.attr ('tab-area');
        var $tabList = $tabArea.children('ul[tab-list]');
        var initialTabValue = $tabList.children('li[tab]:first-child').attr('tab');
        var tabListValue = $tabArea.children('ul[tab-list]').attr('tab-list');
        var urlParam = $(document).getUrlParam (tabListValue);
        if (tabListValue == 'os') {
            initialTabValue = $.ua.os.name || initialTabValue;
        } else if (tabListValue == 'os-version') {
            initialTabValue = osName = $.ua.os.version || initialTabValue;
        }
        if (tabListValue == 'os-version') {
            var $versionTab = $tabArea.parents('div[tab-content]');
            if ($versionTab) {
                var versionTabValue = $versionTab.attr('tab-content');
                var key = tabListValue + '.' + versionTabValue;
                if (localStorage.getItem(key)) {
                    initialTabValue = localStorage.getItem(key) || initialTabValue;
                }
            }
        } else {
            if (supports_html5_storage() && localStorage.getItem(tabListValue)) {
                initialTabValue = localStorage.getItem(tabListValue) || initialTabValue;
            }
        }
        $tabList.children('li[tab]').each(function (i, element) {
            var $tab = $(element);
            var tabValue = $tab.attr('tab');
            $tab.on('click', function () {
                $('ul[tab-list="' + tabListValue + '"]').each(function (i, element) {
                    var $tabArea2 = $(element).parent('div[tab-area]');
                    var $tabList2 = $tabArea2.children('ul[tab-list]');
                    var $tab2 = $tabList2.children('li[tab="' + tabValue + '"]');
                    $tabList2.children('li[tab]').removeClass("tab-active");
                    $tab2.addClass("tab-active");
                    var $tabContentArea2 = $tabArea2.children('div[tab-content-area]');
                    $tabContentArea2.children('div[tab-content]').hide ();
                    var $content = $tabContentArea2.children('div[tab-content="' + tabValue + '"]');
                    $content.show ();
                });
                if (supports_html5_storage() && tabListValue) {
                    if (tabListValue == 'os-version') {
                        var $versionTab = $tabArea.parents('div[tab-content]');
                        if ($versionTab) {
                            var versionTabValue = $versionTab.attr('tab-content');
                            localStorage.setItem(tabListValue + '.' + versionTabValue, tabValue);
                        }
                    } else {
                        localStorage.setItem(tabListValue, tabValue);
                    }
                }
            });
            if (urlParam && urlParam == tabValue) {
                initialTabValue = tabValue;
            }
        });
        $tabList.children('li[tab="' + initialTabValue + '"]').addClass("tab-active");
        var $tabContentArea = $tabArea.children('div[tab-content-area]');
        $tabContentArea.children('div[tab-content]').each(function (i, element) {
            var $content = $(element);
            var tabContentValue = $content.attr('tab-content');
            if (tabContentValue != initialTabValue) {
                $content.hide ();
            }
        });
    });
});
