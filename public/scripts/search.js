console.log('sanity check!');

var restaurantTemplate;
var $restaurantsList;
var allRestaurants = [];

$(document).ready(function() {

    // HANDLEBARS
    $restaurantsList = $('#restaurantTarget');

    var restaurantSource = $('#restaurants-template').html();
    restaurantTemplate = Handlebars.compile(restaurantSource);

    // SUBMIT SEARCH RESTAURANTS FORM
    $('#restaurantSearch').click(function(event) {
        event.preventDefault();

        // STORE CHECKBOX VALUE
        var vegetarianBox = $("#cbox1").is('input:checked');
        var veganBox = $("#cbox2").is('input:checked');
        var glutenFreeBox = $("#cbox3").is('input:checked');
        var dairyFreeBox = $("#cbox4").is('input:checked');
        var nutAllergyBox = $("#cbox5").is('input:checked');
        var kosherBox = $("#cbox6").is('input:checked');

        // SET SEARCH ARRAY INITIAL VALUES TO "0"
        var searchArray = {
            vegetarian: 0,
            vegan: 0,
            glutenFree: 0,
            dairyFree: 0,
            nutAllergy: 0,
            kosher: 0,
        };

        // SETS SEARCH ARRAY VALUES BASED ON FORM INPUT
        function filterSearch() {
            if (vegetarianBox) {
                searchArray.vegetarian = 1;
            }
            if (veganBox) {
                searchArray.vegan = 1;
            }
            if (glutenFreeBox) {
                searchArray.glutenFree = 1;
            }
            if (dairyFreeBox) {
                searchArray.dairyFree = 1;
            }
            if (nutAllergyBox) {
                searchArray.nutAllergy = 1;
            }
            if (kosherBox) {
                searchArray.kosher = 1;
            }
        };

        filterSearch();

        // GET ALL RESTAURANTS TO FILTER
        $.ajax({
            method: "GET",
            url: "/api/restaurants",
            dataType: "json",
            success: queryRestaurantDatabase,
            error: onError
        });

        // FILTER RESTAURANTS BY COMPARING SEARCH ARRAY DIETARY VALUES TO EACH RESTAURANT'S DIETARY VALUES
        function queryRestaurantDatabase(allRestaurants) {

            // EMPTY PREVIOUS SEARCH RESULTS
            $restaurantsList.empty();

            // FILTER RESTAURANTS
            allRestaurants.forEach(function(restaurantData) {
                if (
                    // ALL MUST BE TRUE TO RETURN RESTAURANT, EACH STATEMENT IS ONLY FALSE IF SEARCH ARRAY VALUE IS "1" AND RESTAURANT DIETARY VALUE IS "0"
                    searchArray.vegetarian <= restaurantData.dietary.vegetarian &&
                    searchArray.vegan <= restaurantData.dietary.vegan &&
                    searchArray.glutenFree <= restaurantData.dietary.glutenFree &&
                    searchArray.dairyFree <= restaurantData.dietary.dairyFree &&
                    searchArray.nutAllergy <= restaurantData.dietary.nutAllergy &&
                    searchArray.kosher <= restaurantData.dietary.kosher
                ) {
                    // RENDER SEARCH RESULTS IN HMTL
                    restaurantHtml = restaurantTemplate({
                        restaurant: restaurantData
                    });
                    $restaurantsList.append(restaurantHtml);

                };
            });

            // RESET FORM
            $('#searchRestaurants').each(function() {
                this.reset();
            });
        };

        function onError() {
            console.log('API search error')
        };
    });

});
