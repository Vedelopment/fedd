console.log('sanity check!');

var restaurantTemplate;
var $restaurantsList;
var allRestaurants = [];

$(document).ready(function() {

    //////////   HANDLEBARS   //////////
    $restaurantsList = $('#restaurantTarget');

    var restaurantSource = $('#restaurants-template').html();
    restaurantTemplate = Handlebars.compile(restaurantSource);

    //////////   SUBMIT SEARCH RESTAURANTS   //////////
    $('#restaurantSearch').click(function(event) {
        event.preventDefault();

        var vegetarianBox = $("#cbox1").is('input:checked');
        var veganBox = $("#cbox2").is('input:checked');
        var glutenFreeBox = $("#cbox3").is('input:checked');
        var dairyFreeBox = $("#cbox4").is('input:checked');
        var nutAllergyBox = $("#cbox5").is('input:checked');
        var kosherBox = $("#cbox6").is('input:checked');

        var searchArray = {
            vegetarian: 0,
            vegan: 0,
            glutenFree: 0,
            dairyFree: 0,
            nutAllergy: 0,
            kosher: 0,
        };

        function filterSearch() {
            console.log('filterSearch called');
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
        }

        filterSearch();

        //////////   SEARCH RESTAURANTS   //////////
        $.ajax({
            method: "GET",
            url: "/api/restaurants",
            dataType: "json",
            success: queryRestaurantDatabase,
            error: onError
        })

        // console.log(searchArray);
        function queryRestaurantDatabase(allRestaurants) {
            $restaurantsList.empty();
            allRestaurants.forEach(function(restaurantData) {
                console.log(searchArray);
                // console.log(restaurantData);
                if (
                    searchArray.vegetarian <= restaurantData.dietary.vegetarian &&
                    searchArray.vegan <= restaurantData.dietary.vegan &&
                    searchArray.glutenFree <= restaurantData.dietary.glutenFree &&
                    searchArray.dairyFree <= restaurantData.dietary.dairyFree &&
                    searchArray.nutAllergy <= restaurantData.dietary.nutAllergy &&
                    searchArray.kosher <= restaurantData.dietary.kosher
                ) {
                    restaurantHtml = restaurantTemplate({
                        restaurant: restaurantData
                    });
                    $restaurantsList.append(restaurantHtml);

                }// else {
                //     console.log('a few restaurants did not make the cut!');
                // }
            })

            $('#searchRestaurants').each(function() {
                this.reset();
            });

            searchArray.vegetarian = 0;
            searchArray.vegan = 0;
            searchArray.glutenFree = 0;
            searchArray.dairyFree = 0;
            searchArray.nutAllergy = 0;
            searchArray.kosher = 0;

        };

        function onError() {
            console.log('API search error')
        }
    });

});
