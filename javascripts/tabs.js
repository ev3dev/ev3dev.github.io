// Function to handle tabs from the /_includes/tabs.html template.

function supports_html5_storage() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
}

function makeValidId(text) {
    return text.toLowerCase().replace(' ', '_');
}

$(document).ready(function () {
    // Get the elements that we need to separate (we want the content in a separate div)
    var $tabGroups = $('ul.tab-group');

    // Iterate over each tab group
    $tabGroups.each(function () {
        // Get the header element (the ul that contains the headers and their content)
        var $tabGroupHeader = $(this);
        // Add proper style and other info for this to act as a tab header
        $tabGroupHeader.addClass('nav');
        $tabGroupHeader.addClass('nav-tabs');
        $tabGroupHeader.attr('role', 'tablist');

        // Add a div to hold the content of each tab after the existing header
        var $tabGroupContent = $('<div/>').insertAfter($tabGroupHeader);
        $tabGroupContent.addClass('tab-content');

        // Get the topic of the tab headers (e.g. 'os')
        var tabGroupTopic = $tabGroupHeader.data('tab-topic');

        // Iterate over each tab header element in this group
        $tabGroupHeader.children('li').each(function () {
            // Get the header item and the text that was specified for it
            var $tabHeader = $(this);
            var tabHeadingText = $tabHeader.data('tab-heading');

            // Generate the ID for this tab and its associated content
            var newTabId = 'tab-' + makeValidId(tabHeadingText);

            // Add the content div for this tab to the group's content container
            var $tabContent = $('<div/>').appendTo($tabGroupContent);
            // Add info to link the tab header and the associated content
            $tabContent.addClass('tab-pane');
            $tabContent.attr('id', newTabId);
            $tabContent.attr('role', 'tabpanel');

            // Move the tab contents from the original ul to the new div
            $tabContent.append($tabHeader.contents());

            // Add a link to serve as the clickable header component
            var $headerLink = $('<a/>').appendTo($tabHeader);
            // Set the link target and style info
            $headerLink.attr('href', '#' + newTabId);
            $headerLink.attr('role', 'tab');
            $headerLink.data('toggle', 'tab');
            // Add the header text
            $headerLink.text(tabHeadingText);
            // Register the handler to show the content when the tab is clicked
            $headerLink.click(function (e) {
                e.preventDefault();
                $(this).tab('show');
            });

            // Show the current tab (this will hide all others)
            // TODO: This should be replaced with the old loader logic
            $headerLink.tab('show');
        });

    });
});
