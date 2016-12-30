console.log('sanity check!');


$(document).on("ready", function() {

  //set map icon to fork knife//
  var restMarker = {
    url: "images/restIcon.png",
    scaledSize: new google.maps.Size (35, 35)
  },
  //set center coordinates//
  sanFran = {lat: 37.775676, lng: -122.446669},

  //
  mapConfig = {
    center: sanFran,
    zoom: 13
  };

  var map = new google.maps.Map(document.getElementById('map'), mapConfig);
  var marker = new google.maps.Marker({
    position: sanFran,
    map: map,
    // icon: restMarker
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
          //pull restaurants seed coordinates
          var lat = restaurant.coordinates.lat;
          var lng = restaurant.coordinates.lng;
          var latLon = {lat, lng};
          console.log(latLon);
          //plot restaurants from seed data
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
