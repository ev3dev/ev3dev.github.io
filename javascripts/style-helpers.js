$(document).ready(function () {
    // Make <dl>s more visually separated
    $('dl').addClass('dl-horizontal');
    $('#markdown-toc').wrap('<div class="well pull-right" />');
    $('#markdown-toc').addClass('list-unstyled');

    $('.masonry-container').imagesLoaded().progress(function() {
        $('.masonry-container').masonry('layout');
    })
})

// Offsets view so that nav doesn't cover URL target. There are CSS3 solutions
// to this, but they are hacky and full of caveats.
$(window).on('hashchange load', function () {
    var $anchor = $(':target'),
        fixedElementHeight = 100;

    if ($anchor.length > 0) {
        window.scrollTo(0, $anchor.offset().top - fixedElementHeight);
    }
});