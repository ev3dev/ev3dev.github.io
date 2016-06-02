$(document).ready(function () {
    $('div[data-card-user]').each(function (i, element) {
        var $cardDiv = $(element);
        $.ajax('https://api.github.com/users/' + $cardDiv.data('card-user')).done(function (userData) {
            $cardDiv.addClass('user-card');
            $cardDiv.append('<a href="' + userData.html_url + '"></a>');
            $cardDiv = $cardDiv.children(':last-child')

            $cardDiv.append('<div class="user-card-avatar"><img src="' + userData.avatar_url + '"/></div>');
            var $avatarDiv = $cardDiv.children(':last-child');
            $cardDiv.append('<div class="user-card-text"></div>');
            var $textDiv = $cardDiv.children(':last-child');
            
            $textDiv.append('<div class="user-card-name">' + (userData.name || userData.login) + '</div>');
            $textDiv.append('<div class="user-card-login">@' + userData.login + '</div>');
            
            // Give the text a margin to make sure it does not overlap the avatar
            $avatarDiv.resize(function() {
                $textDiv.css({
                    width: 'auto',
                    "margin-left": $avatarDiv.height()
                });
            });
            
            $avatarDiv.resize();
        });        
    });
});