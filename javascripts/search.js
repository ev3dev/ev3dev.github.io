---
layout: 
---

var searchData;
var dataLoading = false;
var itemLoadTimer, searchKeystrokeEventTimer;

var projectResultArea, docResultArea, newsResultArea, miscResultArea;
$(document).ready(function () {
    docResultArea = $('#search-results-docs > div');
    projectResultArea = $('#search-results-projects > div');
    newsResultArea = $('#search-results-news > div');
    miscResultArea = $('#search-results-misc > div');

    var searchQuery = getQueryParam("search");
    if (searchQuery != undefined && searchQuery != "") { //If a search query was provided in the query strings, execute the search
        loadSearchData(function () {
            searchUpdate();
        });

        $("#search-input").val(searchQuery);
    }

    //Close the search results if the input and results lose focus
    $('body').click(function (event) {
        //Check if the click registered on a non search-related element 
        if (!($(event.target).parents('#search-container').length)) {
            hideSearchDropdown();
        }
    });

    $('#search-input')
        .focus(searchFocus)
        .keyup(searchTextChanged);


});

Array.prototype.clean = function (deleteValue) {
    if (deleteValue == undefined)
        deleteValue = '';
    for (var i = 0; i < this.length; i++) {
        if (this[i] == deleteValue) {
            this.splice(i, 1);
            i--;
        }
    }
    return this;
};

//Load the search data if the user seems like they intend to enter a query
//If they have already entered text, open the suggestions
function searchFocus() {
    if (!searchData)
        loadSearchData(function () {
            searchUpdate();
        });
    else
        searchUpdate();
}

function searchTextChanged() {
    if (searchKeystrokeEventTimer != undefined)
        clearTimeout(searchKeystrokeEventTimer);

    searchKeystrokeEventTimer = setTimeout(function () {
        searchKeystrokeEventTimer = undefined;
        searchUpdate();
    }, 400);
}

//Loads the data from the JSON document
function loadSearchData(callback) {
    if (dataLoading)
        return;

    dataLoading = true;
    $.getJSON(pageLinkBaseUrl + "/search-index.json", function (e) {
        dataLoading = false;
        searchData = e.slice(0, -1);

        if (callback != undefined)
            callback();
    });
}

//Function to actually execute the search (currently only searches title)
function findResults(term) {
    if (!searchData)
        return undefined;

    //Split by word
    var terms = term.toLowerCase().split(/\W/g);
    terms = terms.clean();

    var result = [];
    if (terms.length <= 0)
        return result;

    //Iterate over the searchable data
    for (var i in searchData) {
        //Skip this item if there is no title
        if (searchData[i].title == undefined)
            continue;

        var numMatches = 0;
        var title = searchData[i].title.toLowerCase();

        //Count the number of terms (words) that are present in the title
        for (var termIndex = 0; termIndex < terms.length; termIndex++) {
            if (title.search(terms[termIndex]) != -1)
                numMatches++;
        }

        //If all terms match, this one is a hit
        if (numMatches >= terms.length)
            result.push(searchData[i]);
    }

    return result;
}

//Function to read query parameters
function getQueryParam(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

//Updates the search function as a whole, and manages the visuals as necessary
function searchUpdate() {
    var searchString = $("#search-input").val();

    if (searchString == undefined || searchString.length == 0) {
        hideSearchDropdown();
    }
    else {
        doSearch(searchString);
    }
}

//Executes a search and displays the results
function doSearch(query) {

    //Stop all animations
    if (itemLoadTimer)
        clearTimeout(itemLoadTimer);
    $("#search-dropdown .search-result").stop(false, true);
    $("#search-dropdown .search-result").show();

    //Clear existing results
    docResultArea.children('.search-result').remove();
    projectResultArea.children('.search-result').remove();
    newsResultArea.children('.search-result').remove();
    miscResultArea.children('.search-result').remove();

    //Start the dropdown box's 'open' animation
    if (!$('#search-dropdown').is(":visible"))
        $('#search-dropdown').slideDown(400, function () {
        });

    var results = findResults(query);

    //Load and animate the search results (use good JavaScript practices and do it recursively using acync callbacks)
    function loadItem(i) {
        var resultArea = miscResultArea;

        var categoryTags = results[i].category.split(' ');
        if (categoryTags.indexOf('docs') != -1)
            resultArea = docResultArea;
        else if (categoryTags.indexOf('projects') != -1)
            resultArea = projectResultArea;
        else if (categoryTags.indexOf('news') != -1)
            resultArea = newsResultArea;

        // NOTE: Links are taken as-is from the search index. These links are relative to the
        // website root, so they start with "/". This means that they won't resolve over file://
        // or other protocols that don't use the site root as the URL root.
        resultArea.loadTemplate($('#search-result-template'), results[i], { append: true });

        resultArea.children().last().show(20);

        if (i < results.length - 1) {
            itemLoadTimer = setTimeout(function () {
                loadItem(i + 1)
            }, 5);
        }
    }

    if (results.length > 0)
        loadItem(0);
}


//Hides the search dropdown and ties up any loose animations
function hideSearchDropdown() {
    if (itemLoadTimer)
        clearTimeout(itemLoadTimer);
    $("#search-dropdown .search-result").stop(false, true);
    $("#search-dropdown .search-result").show();

    if ($('#search-dropdown').is(":visible")) {
        $('#search-dropdown').slideUp(400, function () {
        });
    }
}