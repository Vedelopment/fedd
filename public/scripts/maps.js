console.log('sanity check!');

$(document).on("ready", function() {

      // SET MAP ICON
      var restMarker = {
        url: "images/location_map_green.png",
        scaledSize: new google.maps.Size (35 , 35)
      },
      // SET MAP CENTER COORDINATES
      sanFran = {lat: 37.775676, lng: -122.446669},

      // CONFIG MAP TO CENTER AND ZOOM
      mapConfig = {
        center: sanFran,
        zoom: 13
      };

      var map = new google.maps.Map(document.getElementById('map'), mapConfig);
      
      // FUTURE CODE?
      // PLACE MARKER ON MAP CENTER -- NOT IN CURRENT WORKING VERSION
      // var marker = new google.maps.Marker({
      //   position: sanFran,
      //   map: map,
      //   // icon: restMarker
      // });

      $.ajax({
        method:"GET",
        url:"/api/restaurants",
        dataType: "json",
        success: onSuccess,
        error: onError
      })

      function onSuccess(restaurants){
        restaurants.forEach(function(restaurant){

          // if no coordinates entered, skip all below
          if (!restaurant.coordinates) {
            return false;
          }
          // pull restaurants seed coordinates
          var lat = restaurant.coordinates.lat;
          var lng = restaurant.coordinates.lng;
          var latLon = {lat, lng};
          console.log(latLon);

          // plot restaurants from seed data
          var marker = new google.maps.Marker({
            position: latLon,
            map: map,
            icon: restMarker
          });
        });
      };

      function onError() {
        console.log('API map error')
      }

    });
