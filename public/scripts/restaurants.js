console.log('sanity check!');

var MODAL_SELECTOR = '#myModal';
var restaurantTemplate;
var $restaurantsList;
var allRestaurants = [];

$(document).ready(function() {

    //////////   HANDLEBARS   //////////
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
    $('.restaurant-add').click(function(event) {
        event.preventDefault();
        // console.log('new restaurant for submit');

        var dietaryTags = "";
        $('input[type=checkbox]').each(function () {
            var key = $(this).attr('class');
            var thisVal = (this.checked ? "1" : "0");
            // dietaryTags += (dietaryTags=="" ? key + ": " + thisVal : ", " + key + ": " + thisVal);
            dietaryTags += (dietaryTags=="" ? key + "=" + thisVal : "&" + key + "=" + thisVal);
        });
        // dietaryTags = dietaryTags + "}";
        // console.log (dietaryTags);

        $('#newRestaurantForm').submit(event);
        event.preventDefault();
        var formData = $('#newRestaurantForm').serialize();
        // var dietaryString = JSON.stringify(dietaryTags);
        // dietaryString = dietaryString.replace(/\"/g, "");
        // var dietaryString = $.param(dietaryTags);
        // var submitData = "dietary=" + dietaryTags + "&" + formData;
        var submitData = dietaryTags + "&" + formData;
        console.log(dietaryTags);
        console.log(submitData);
        // dietaryString = JSON.parse(dietaryString);
        // console.log(dietaryString);


        $.ajax({
            method: 'POST',
            url: '/api/restaurants',
            data: submitData,
            success: newRestaurantSuccess,
            error: apiError
        });
    });

    //////////   UDPATE RESTAURANT   //////////
    $('#updateRestaurantForm').submit(function(event) {
        event.preventDefault();
        var restId = $(MODAL_SELECTOR).data('id');
        var data = {};
        $(this).serializeArray().forEach(function(item) {
            data[item.name] = item.value;
        });

        console.log(restId, data);

        $.ajax({
            method: 'PATCH',
            url: '/api/restaurants/' + restId,
            data: data,
            success: updateRestaurantSuccess,
            error: apiError
        });

        $(MODAL_SELECTOR).modal('toggle');
    });

    //////////   DELETE RESTAURANT   //////////
    $('#restaurantTarget').on("click", ".deleteRestaurantButton", function(event){
        console.log('delete submitted');
        // var restId = $('#deleteRestaurantButton').data('id');
        var restId = $(this).closest('.content-card').data('id');
        // var data = {};
        // $(this).serializeArray().forEach(function(item) {
        //     data[item.name] = item.value;
        // });

        console.log(restId);
        //
        $.ajax({
            method: 'DELETE',
            url: '/api/restaurants/' + restId,
            data: 'json',
            success: deleteRestaurantSuccess,
            error: apiError
        });

        // $(MODAL_SELECTOR).modal('toggle');
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
        console.log('new restaurant success called')
        $('#newRestaurantForm input').val('');
        allRestaurants.push(json);
        console.log(allRestaurants);
        console.log(json);
        $restaurantsList.append(json);
        // window.location.reload();
    }

    //////////   UPDATE RESTAURANT SUCCESS FUNCTION   //////////
    function updateRestaurantSuccess(response) {
        var $article = $('article[data-id=' + response._id + ']');

        $article.find('.name a').text(response.name);
        $article.find('.name a').attr('href', response.url);
        $article.find('.description').text(response.description);
        $article.find('.address').text(response.address);
        $article.find('.dietary').text(response.dietary);
    }

    //////////   DELETE RESTAURANT SUCCESS FUNCTION   //////////
    function deleteRestaurantSuccess(response) {
        // var $article = $('article[data-id=' + response._id + ']');

        function destroy(req, res) {

          // find one album by id, delete it, and send it back as JSON

          db.Restaurant.findOneAndRemove({ _id: req.params.restaurant_id }, function(err, deletedRestaurant) {
             res.json(deletedRestaurant);
           });
        }
        window.location.reload();
    }

    //////////   ERROR FUNCTION   //////////
    function apiError(e) {
        console.log('api error, is the server working?');
        // $('#restaurantTarget').text('api error, is the server working?');
    }


    /////////////////////////////////////////////////////////////
    //////////////////   MODAL FUNCTIONS   //////////////////////
    /////////////////////////////////////////////////////////////


    ///// Sets all form information to the restaurant /////
    function setModalData(event) {
        /// gets all text data of restaurant ////
        var $article = $(event.target).parents('article'),
            id = $article.data('id'),
            name = $article.find('.name').text().trim(),
            url = $article.find('.name a').attr('href').trim(),
            description = $article.find('.description').text().trim(),
            address = $article.find('.address').text().trim(),
            dietary = $article.find('.dietary').text().trim();

        ////creates obj of data////
        var data = {
            id: id,
            name: name,
            url: url,
            description: description,
            address: address,
            dietary: dietary
        }

        /// Selecting all elements ///
        var $modal = $(MODAL_SELECTOR);
        $description = $modal.find('input[name=description]'),
            $name = $modal.find('input[name=name]'),
            $address = $modal.find('input[name=address]'),
            $dietary = $modal.find('input[name=dietary]'),
            $url = $modal.find('input[name=url]');

        /// Setting all elements in modal to display previous information ///
        $modal.data('id', data.id);
        $description.val(data.description);
        $name.val(data.name);
        $address.val(data.address);
        $dietary.val(data.dietary);
        $url.val(data.url);
    }

    /// Click handler for the restaurant modal  ///
    $('body').on('click', 'button.restaurant-edit', setModalData);

});
