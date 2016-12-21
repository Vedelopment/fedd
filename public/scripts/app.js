console.log('sanity check!');

var restaurantTemplate;
var $restaurantsList;
var allRestaurants = [];

$(document).ready(function() {

    //////////   HANDLEBARS STUFF   //////////
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

    //////////   SUBMIT NEW RESTAURANT   //////////
    $('#newRestaurantForm').on('submit', function(event) {
        event.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/restaurants',
            data: $(this).serialize(),
            success: newRestaurantSuccess,
            error: apiError
        });
    });

    $('#updateRestaurantForm').on('submit', function(event) {
       event.preventDefault();
       console.log('for submit');
       $.ajax({
         method: 'POST',
         url: '/api/restaurants/'+$(this).attr('data-id'),
         data: $(this).serializeArray(),
         success: updateRestaurantSuccess,
         error: apiError
       });
     });



    /////////////////////////////////////////////////////////////
    //////////////////   SUCCESS FUNCTIONS   ////////////////////
    /////////////////////////////////////////////////////////////

    //////////   LOAD ALL RESTAURANTS SUCCESS FUNCTION   //////////
    function handleRestaurantsLoadSuccess(allRestaurants) {
        allRestaurants.forEach(function(restaurantData) {
            restaurantHtml = restaurantTemplate({
                restaurant: restaurantData
            });
            $restaurantsList.append(restaurantHtml);

        })
    };

    //////////   ADD NEW RESTAURANT SUCCESS FUNCTION   //////////
    function newRestaurantSuccess(json) {
        $('#newRestaurantForm input').val('');
        allRestaurants.push(json);
        console.log(allRestaurants);
        allRestaurants.append(json);
    }

    //////////   UPDATE RESTAURANT SUCCESS FUNCTION   //////////
    function updateRestaurantSuccess(json) {
      var restaurant = json;
      var restaurandId = restaurant._id;

      for(var )

    }



    //////////   ERROR FUNCTION   //////////
    function apiError(e) {
        console.log('api error, is the server working?');
        // $('#restaurantTarget').text('api error, is the server working?');
    }

});
