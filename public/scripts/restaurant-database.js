$(document).ready(function() {

    //////////   HANDLEBARS   //////////
    $restaurantsList = $('#restaurantTarget');

    var restaurantSource = $('#restaurants-template').html();
    restaurantTemplate = Handlebars.compile(restaurantSource);

    //////////   LOAD API SEED DATA ON PAGE LOAD   //////////
    $.ajax({
        method: 'GET',
        url: '/api/restaurants',
        success: handleRestaurantsLoadSuccess,
        error: apiError,
    });

    //////////   LOAD ALL RESTAURANTS SUCCESS FUNCTION   //////////
    function handleRestaurantsLoadSuccess(allRestaurants) {
      $restaurantsList.empty();
      allRestaurants.forEach(function(restaurantData) {
        restaurantHtml = restaurantTemplate({
          restaurant: restaurantData
        });
        $restaurantsList.append(restaurantHtml);

      })
    };

    //////////   ERROR FUNCTION   //////////
    function apiError(e) {
        console.log('api error, is the server working?');
        // $('#restaurantTarget').text('api error, is the server working?');
    }

  });
