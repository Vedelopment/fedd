console.log('sanity check!');

// window.initMap= function() {}
// //
var initMap= function() {
var uluru = {lat: 37.78, lng: -122.44};
var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 13,
  center: uluru
});


//
var marker = new google.maps.Marker({
  position: uluru,
  map: map
});
}

// var map;
// function initMap() {
//   map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 12,
//     center: new google.maps.LatLng(37.78,-122.44),
//     mapTypeId: 'terrain'
//   });

//   // Create a <script> tag and set the USGS URL as the source.
//   var script = document.createElement('script');
//   // This example uses a local copy of the GeoJSON stored at
//   // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
//   script.src = 'http://localhost:3000/api/restaurants/gps';
//   document.getElementsByTagName('head')[0].appendChild(script);
// }
//
// // Loop through the results array and place a marker for each
// // set of coordinates.
// // window.eqfeed_callback = function(results) {
// //   for (var i = 0; i < results.features.length; i++) {
// //     var coords = results.features[i].address.coordinates;
// //     var latLng = new google.maps.LatLng(coords[1],coords[0]);
// //     var marker = new google.maps.Marker({
// //       position: latLng,
// //       map: map
// //     });
// //   }
// // }

$(document).on("ready", function() {

  $.ajax( {
          method:"GET",
          url:"/api/restaurants/maps",
          dataType: "json",
          success: onSuccess,
        })


  function onSuccess(restaurants){
    console.log("its hitting");
    // restaurants.forEach(function(restaurants){
    //     //variable for dropping pins
    //     var lngLat = {
    //       lng: restaurants.coordinates.lat,
    //       lat: restaurants.coordinates.lon
        }

//   var restaurantMarker = {url: "burger.png", scaledSize: new google.maps.Size (22, 32)}
//

//           $('#map').append(developerHtml);
//           marker = new google.maps.Marker({
//             map: map,
//             position: lngLat,
//             icon: restaurantMarker
//       });
//     });
//   }































    //load page with map
  // $.ajax( {
  //         method:"GET",
  //         url:"http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson",
  //         dataType: "json",
  //         success: onSuccess,
  //         // error: onError,
  //         // complete: onCompletion
  //       })
  // //add in map on page include SF coordinates
  // var map = new google.maps.Map(document.getElementById('map'), {
  //             center: { lat: 37.78, lng: -122.44},
  //             zoom: 3
  //               });
  //
  // var houseMarker = {url: "images/burger.png", scaledSize: new google.maps.Size (22, 32)}
  //
  // function onSuccess(restaurants){
  //     restaurants.features.forEach(function(restaurants){
  //         //variable for dropping pins
  //         var lngLat = {
  //           lng: restaurants.coordinates,
  //           lat: restaurants.coordinates
  //         });
  //         $('#info').append(developerHtml);
  //         marker = new google.maps.Marker({
  //           map: map,
  //           position: lngLat,
  //           icon: houseMarker
  //     });
  //   });
  // }

    // $.ajax( {
    //         method:"GET",
    //         url: '/api/maps',
    //         dataType: "json",
    //         success: onSuccess,
    //         // error: onError,
    //         // complete: onCompletion
    //       })
    //
    //
    // //mysterious google magic. lower than default saturation, and businesses not labeled.
    // //within google magic, comments with six slashes are our comments, comments with two comments are google
    // function initMap() {
    //     var map = new google.maps.Map(document.getElementById('map'), {
    //         center: { lat: 37.7749, lng: -122.4504 },
    //         zoom: 12,
    //         styles: [{
    //             featureType: 'all',
    //             stylers: [
    //                 { saturation: -50 }
    //             ]
    //         }, {
    //             featureType: 'poi.business',
    //             elementType: 'labels',
    //             stylers: [
    //                 { visibility: 'off' }
    //             ]
    //         }]
    //     });
    //     var input = /** @type {!HTMLInputElement} */ (
    //         document.getElementById('pac-input'));
    //
    //     var types = document.getElementById('type-selector');
    //     map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    //     map.controls[google.maps.ControlPosition.TOP_LEFT].push(types);
    //
    //     var autocomplete = new google.maps.places.Autocomplete(input);
    //     autocomplete.bindTo('bounds', map);
    //
    //     var infowindow = new google.maps.InfoWindow();
    //     var marker = new google.maps.Marker({
    //         map: map,
    //         anchorPoint: new google.maps.Point(0, -29)
    //     });
    //     //////loop through list of GPS values, placing pins on map
    //     function placeRestaurants(gpsList) {
    //         console.log(gpsList);
    //         gpsList.forEach(function(location, index, array) {
    //             var tempLat = location[0];
    //             var tempLng = location[1];
    //             var tempContentString = "<p>" + location[2] + "</p>";
    //
    //             var tempInfoWindow = new google.maps.InfoWindow({
    //                 content: tempContentString
    //             })
    //             var icon = {
    //                 url: 'images/burger.png',
    //                 scaledSize: new google.maps.Size(30, 30), // scaled size
    //                 origin: new google.maps.Point(0,0), // origin
    //                 anchor: new google.maps.Point(0, 0) // anchor
    //             };
    //             var tempMarker = new google.maps.Marker({
    //                 position: new google.maps.LatLng(tempLat, tempLng),
    //                 map: map,
    //                 icon: icon,
    //                 title: location[2]
    //             });
    //             tempMarker.addListener('click', function() {
    //                 tempInfoWindow.open(map, tempMarker);
    //             })
    //         })
    //     }
    //     //////get list of document GPS values and call placeRestaurants with that GPS list
    //     function placeRestaurantsList() {
    //         $.ajax({
    //             method: 'GET',
    //             url: '/api/restaurants/gps',
    //             success: placeRestaurants
    //         })
    //     }
    //     placeRestaurantsList()
    //
    //
    //
    //     autocomplete.addListener('place_changed', function() {
    //         infowindow.close();
    //         marker.setVisible(false);
    //         var place = autocomplete.getPlace();
    //         //////google has found our place for us, time to grab necessary data and store as an object to send via AJAX
    //         newPlace = {
    //             lat: place.geometry.location.lat,
    //
    //             lon: place.geometry.location.lng,
    //
    //             type: 'restaurant',
    //             //////formatted address is a string, we want the first two components between commas
    //             address: place.formatted_address.split(',')[0],
    //             cityName: place.formatted_address.split(',')[1],
    //         }
    //         if (!place.geometry) {
    //             window.alert("Autocomplete's returned place contains no geometry");
    //             return;
    //         }
    //
    //         // If the place has a geometry, then present it on a map.
    //         if (place.geometry.viewport) {
    //             map.fitBounds(place.geometry.viewport);
    //             map.setZoom(15); //////override google's auto zoom control to see more of area where bin is located
    //         } else {
    //             map.setCenter(place.geometry.location);
    //             map.setZoom(17); // Why 17? Because it looks good.
    //         }
    //         marker.setIcon( /** @type {google.maps.Icon} */ ({
    //             url: place.icon,
    //             size: new google.maps.Size(71, 71),
    //             origin: new google.maps.Point(0, 0),
    //             anchor: new google.maps.Point(17, 34),
    //             scaledSize: new google.maps.Size(35, 35)
    //         }));
    //         marker.setPosition(place.geometry.location);
    //         marker.setVisible(true);
    //
    //
    //         //////defines the popup content when google maps places a pin on our autocomplete
    //         ////// includes button to add location via AJAX POST call
    //         infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + '<button id="addLocationButton">Add Location</button>');
    //         infowindow.open(map, marker);
    //         $('#addLocationButton')
    //             .on('click', function(e) {
    //                 //////AJAX TIME, post to /api/recetpacles
    //                 $.ajax({
    //                         method: 'POST',
    //                         url: '/api/restaurants',
    //                         data: newPlace,
    //                         success: createdSuccess
    //                     })
    //                     //////we don't need this marker anymore if the location has been added to the map.
    //                 marker.setMap(null);
    //             })
    //     });
    //
    // }
    // //end google magic



});
