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
      console.log('restaurant search submitted');
      var vegetarianBox = $("#cbox1").is('input:checked');
      var veganBox = $("#cbox2").is('input:checked');
      var glutenFreeBox = $("#cbox3").is('input:checked');
      var dairyFreeBox = $("#cbox4").is('input:checked');
      var kosherBox = $("#cbox5").is('input:checked');
      var nutAllergyBox = $("#cbox6").is('input:checked');
      // console.log(vegetarianBox);
      // console.log(veganBox);
      // console.log(glutenFreeBox);
      // console.log(dairyFreeBox);
      // console.log(kosherBox);
      // console.log(nutAllergyBox);

      //////////   SEARCH RESTAURANTS   //////////
      $.ajax({
        method:"GET",
        url:"/api/restaurants",
        dataType: "json",
        success: queryRestaurantDatabase,
        error: onError
      })

      function queryRestaurantDatabase(allRestaurants) {
        console.log('query function called');
        allRestaurants.forEach(function(restaurantData) {
          if (restaurantData.dietary.kosher == true) {
              restaurantHtml = restaurantTemplate({
                  restaurant: restaurantData
              });
              $restaurantsList.append(restaurantHtml);

            } else {
              console.log ('a few restaurants did not make the cut!');
            }
        })
      };

      // function queryRestaurantDatabase(allRestaurants) {
      //     allRestaurants.forEach(function(restaurantData) {
      //         restaurantHtml = restaurantTemplate({
      //             restaurant: restaurantData
      //         });
      //         $restaurantsList.append(restaurantHtml);
      //
      //     })
      // };

      function onError() {
        console.log('API search error')
      }
    });

});
