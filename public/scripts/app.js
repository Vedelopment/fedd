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

//////////   RESTAURANT SUCCESS FUNCTION   //////////
function handleRestaurantsLoadSuccess(allRestaurants) {
  allRestaurants.forEach(function(restaurantData){
    restaurantHtml = restaurantTemplate({restaurant: restaurantData});
    $restaurantsList.append(restaurantHtml);

  })
};
//////////   ERROR FUNCTION   //////////
function apiError(e) {
  console.log('api error, is the server working?');
  // $('#restaurantTarget').text('api error, is the server working?');
}

});
