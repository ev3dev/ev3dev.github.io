// Function to handle tabs from the /_includes/tabs.html template.

$(document).ready(function () {
    $('div[tab-area]').each(function (i, element) {
        var $tabArea = $(element);
        var $visibleContent;
        $tabArea.find('li[tab]').each(function (i, element) {
            var $tab = $(element);
            if (i == 0)
                $tab.addClass("tab-active");
            var id = $tab.attr('tab');
            $tab.on('click', function () {
                $tabArea.find('li[tab]').removeClass("tab-active");
                $tab.addClass("tab-active");
                $visibleContent.hide ();
                var $content = $tabArea.find('div[tab-content="' + id + '"]');
                $content.show ();
                $visibleContent = $content;
            });
        });
        $tabArea.find('div[tab-content]').each(function (i, element) {
            var $content = $(element);
            if (i > 0)
                $content.hide ();
            else
                $visibleContent = $content;
        });
    });
});