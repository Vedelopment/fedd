console.log('sanity check!');

// var restaurantMarker = {url: "rest.png", scaledSize: new google.maps.Size (22, 32)}
// $('#map').append();
  // icon: restaurantMarker

  // var newMarker = function() {
  //
  // }

$(document).on("ready", function() {
  var restMarker = {
    url: "images/restIcon.png",
    scaledSize: new google.maps.Size (30, 30)
  },
  sanFran = {lat: 37.78, lng: -122.44},
  mapConfig = {
    center: sanFran,
    zoom: 14
  };

  var map = new google.maps.Map(document.getElementById('map'), mapConfig);
  var marker = new google.maps.Marker({
    position: sanFran,
    map: map,
    icon: restMarker
  });



      // marker.setMap(map);
      $.ajax({
        method:"GET",
        url:"/api/restaurants",
        dataType: "json",
        success: onSuccess,
        error: onError
      })

      function onSuccess(restaurants){
        console.log('hello??');
        restaurants.forEach(function(restaurant){

          //if no coordinates entered, skip all below
          if (!restaurant.coordinates) {
            return false;
          }

          var lat = restaurant.coordinates.lat;
          var lng = restaurant.coordinates.lng;
          var latLon = {lat, lng};
          console.log(latLon);

          var marker = new google.maps.Marker({
            position: latLon,
            map: map,
            icon: restMarker
          });
          console.log('new marker?');
        });
      };

      function onError() {
        console.log('API map error')
      }
    });
