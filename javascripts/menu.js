$(document).ready(function () {
    var headerHeight = $('#header').height();

    $('.nav-menu').click(function () {
        if ($('#header').height() <= 50) {

            $('#header').removeClass('mobile-hidden');
            $('#header').animate({ height: 416 }, 400, function () {
                $('#header').height('auto');
            });
        }
        else
            $('#header').animate({ height: headerHeight }, 400, 'swing', function () {
                $('#header').addClass('mobile-hidden');
                $('#header').css('height', '');
            });
    });
});