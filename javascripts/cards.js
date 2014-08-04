$(document).ready(function () {
    $('div[data-card-user]').each(function (i, element) {
        var $cardDiv = $(element);
        $.ajax('https://api.github.com/users/' + $cardDiv.data('card-user')).done(function (userData) {
            $cardDiv.addClass('user-card');
            $cardDiv.append('<a href="' + userData.html_url + '"></a>');
            $cardDiv = $cardDiv.children(':last-child')

            $cardDiv.append('<div class="user-card-avatar"><img src="' + userData.avatar_url + '"/></div>');
            $cardDiv.append('<div class="user-card-text"></div>');
            var $textDiv = $cardDiv.children(':last-child');
            $textDiv.append('<div class="user-card-name">' + (userData.name || userData.login) + '</div>');
            $textDiv.append('<div class="user-card-login">@' + userData.login + '</div>');
        });        
    });
});