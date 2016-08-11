$(document).ready(function () {
    // Make <dl>s more visually separated
    $('dl').addClass('dl-horizontal');
    $('#markdown-toc').wrap('<div class="well pull-right" />');
    $('#markdown-toc').addClass('list-unstyled');

    $('#project-thumbnail-grid').imagesLoaded().progress(function() {
        $('#project-thumbnail-grid').masonry('layout');
    })
})