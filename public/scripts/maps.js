console.log('sanity check!');


// window.initMap= function() {
//
var initMap= function() {
var uluru = {lat: 37.78, lng: -122.44};
var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 13,
  center: uluru
});
var marker = new google.maps.Marker({
  position: uluru,
  map: map
});
}


$(document).ready(function() {

    $('#more').click(function() {
        // $(this).hide();
        $("#mySidenav").addClass('sidenav-open');
    })

    $('.closebtn').click(function() {
        // $('#more').show();
        $("#mySidenav").removeClass('sidenav-open');
    })

    // $.ajax( {
    //         method:"GET",
    //         url: '/api/maps',
    //         dataType: "json",
    //         success: onSuccess,
    //         // error: onError,
    //         // complete: onCompletion
    //       })


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
