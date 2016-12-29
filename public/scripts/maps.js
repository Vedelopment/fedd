console.log('sanity check!');

var restMarker = {url: "images/restIcon.png", scaledSize: new google.maps.Size (30, 30)}
// var restaurantMarker = {url: "rest.png", scaledSize: new google.maps.Size (22, 32)}
// $('#map').append();
  // icon: restaurantMarker

  // var newMarker = function() {
  //
  // }

$(document).on("ready", function() {

  var map = new google.maps.Map(document.getElementById('map'), {
              center: { lat: 37.78, lng: -122.44},
              zoom: 14
                });

            var sanFran = {lat: 37.78, lng: -122.44};
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
        restaurants.forEach(function(restaurants){
          var lat = restaurants.coordinates.lat;
          var lon = restaurants.coordinates.lon;
          var latLon = {lat, lon};
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
