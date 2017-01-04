console.log('sanity check!');

var cuisineTemplate;
var $cuisinesList;
var allCuisines = [];

$(document).ready(function() {

    // HANDLEBARS FOR CUISINES
    $cuisinesList = $('#cuisineTarget');

    var cuisineSource = $('#cuisines-template').html();
    cuisineTemplate = Handlebars.compile(cuisineSource);

    // GET ALL CUISINES
    $.ajax({
        method: 'GET',
        url: '/api/cuisines',
        success: handleCuisinesLoadSuccess,
        error: apiError,
    });

    //////////   LOAD ALL CUISINES SUCCESS FUNCTION   //////////
    function handleCuisinesLoadSuccess(allCuisines) {
        allCuisines.forEach(function(cuisineData) {
            cuisineHtml = cuisineTemplate({
                cuisine: cuisineData
            });
            $cuisinesList.append(cuisineHtml);

        })
    };

    function apiError(e) {
        console.log('api error, is the server working?');
    }

});
