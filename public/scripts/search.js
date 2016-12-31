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
            vegetarian: false,
            vegan: false,
            glutenFree: false,
            dairyFree: false,
            nutAllergy: false,
            kosher: false,
        };

        function filterSearch() {
            console.log('filterSearch called');
            if (vegetarianBox) {
                searchArray.vegetarian = true;
            }
            if (veganBox) {
                searchArray.vegan = true;
            }
            if (glutenFreeBox) {
                searchArray.glutenFree = true;
            }
            if (dairyFreeBox) {
                searchArray.dairyFree = true;
            }
            if (nutAllergyBox) {
                searchArray.nutAllergy = true;
            }
            if (kosherBox) {
                searchArray.kosher = true;
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
                    searchArray.vegetarian === restaurantData.dietary.vegetarian &&
                    searchArray.vegan === restaurantData.dietary.vegan &&
                    searchArray.glutenFree === restaurantData.dietary.glutenFree &&
                    searchArray.dairyFree === restaurantData.dietary.dairyFree &&
                    searchArray.nutAllergy === restaurantData.dietary.nutAllergy &&
                    searchArray.kosher === restaurantData.dietary.kosher
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

            searchArray.vegetarian = false;
            searchArray.vegan = false;
            searchArray.glutenFree = false;
            searchArray.dairyFree = false;
            searchArray.nutAllergy = false;
            searchArray.kosher = false;

        };

        function onError() {
            console.log('API search error')
        }
    });

});
