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
      // var restId = $('.update').attr('data-id');
      // console.log(restId);
      //  $.ajax({
      //    method: 'PATCH',
      //    url: '/api/restaurants/'+restId,
      //    data: $(this).serializeArray(),
      //    success: updateRestaurantSuccess,
      //    error: apiError
      //  });
      //  $('#myModal').modal('toggle');

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
      $.ajax({
        method: 'GET',
        url: '/api/restaurants/'+json._id,
        data: $(this).serializeArray(),
        success: updateRestaurantSuccessAppend,
        error: apiError
      });

    }

    // function updateRestaurantSuccessAppend (json) {
    // var restaurantsHtml = restaurantTemplate(json);
    //  $('[data-id='+json._id+']').html(restaurantsHtml);
    //  console.log("appended", json);
    // }

    function appendSongError(err){
      console.log("not appended", err)
    }



    //////////   ERROR FUNCTION   //////////
    function apiError(e) {
        console.log('api error, is the server working?');
        // $('#restaurantTarget').text('api error, is the server working?');
    }

});
