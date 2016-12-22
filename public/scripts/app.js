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
    //////////   UDPATE RESTAURANT   //////////
    $('#updateRestaurantForm').submit(function(event) {
       event.preventDefault();
      //  var currentId = $('#restaurantTarget');
      //  var restId = $(currentId).attr('id');
      var restId = $('.update').attr('data-id');
      console.log(restId);
       $.ajax({
         method: 'PATCH',
         url: '/api/restaurants/'+ restId,
         data: $(this).serializeArray(),
         success: updateRestaurantSuccess,
         error: apiError
       });
       $('#myModal').modal('toggle');
      //  console.log($(this).attr('data-id'));

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
      console.log('plz');
      // var restaurant = json;
      // var restaurandId = restaurant._id;
      //
      // for(var )

    }



    //////////   ERROR FUNCTION   //////////
    function apiError(e) {
        console.log('api error, is the server working?');
        // $('#restaurantTarget').text('api error, is the server working?');
    }

});
