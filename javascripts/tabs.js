// Function to handle tabs from the /_includes/tabs.html template.

$(document).ready(function () {
    $('div[tab-area]').each(function (i, element) {
        var $tabArea = $(element);
        var id = $tabArea.attr ('tab-area');
        var urlParam = $(document).getUrlParam ('tabs-' + id);
        var $visibleContent;
        var initalTabIndex = 0;
        $tabArea.find('li[tab]').each(function (i, element) {
            var $tab = $(element);
            var id = $tab.attr('tab');
            $tab.on('click', function () {
                $tabArea.find('li[tab]').removeClass("tab-active");
                $tab.addClass("tab-active");
                $visibleContent.hide ();
                var $content = $tabArea.find('div[tab-content="' + id + '"]');
                $content.show ();
                $visibleContent = $content;
            });
            var name = $tab.attr('tab-name');
            if (urlParam && urlParam == name)
                initalTabIndex = i;
        });
        $tabArea.find('li[tab="' + initalTabIndex + '"]').addClass("tab-active");
        $tabArea.find('div[tab-content]').each(function (i, element) {
            var $content = $(element);
            if (i == initalTabIndex)
                $visibleContent = $content;
            else
                $content.hide ();
        });
    });
});