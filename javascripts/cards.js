// Cache will time out after 1 hour
var userCardCacheTimeMillis = 60 * 60 * 1000;

$(document).ready(function () {
    $('div[data-card-user]').each(function (i, element) {
        var $cardDiv = $(element);
        getApiValue('https://api.github.com/users/' + $cardDiv.data('card-user'), userCardCacheTimeMillis, function (userData, error) {
            if (error || !userData) {
                console.error("User card data not available! Using static text card instead.");
                return;
            }
            
            $cardDiv.empty();
            $cardDiv = $('<a href="' + userData.html_url + '"></a>').appendTo($cardDiv);
            
            var $avatarDiv = $('<div class="user-card-avatar"><img src="' + userData.avatar_url + '"/></div>').appendTo($cardDiv);
            var $textDiv = $('<div class="user-card-text"></div>').appendTo($cardDiv);

            $textDiv.append('<div class="user-card-name">' + (userData.name || userData.login) + '</div>');
            $textDiv.append('<div class="user-card-login">@' + userData.login + '</div>');

            // Give the text a margin to make sure it does not overlap the avatar
            $avatarDiv.resize(function () {
                $textDiv.css({
                    width: 'auto',
                    "margin-left": $avatarDiv.height()
                });
            });

            $avatarDiv.resize();
        });
    });
});