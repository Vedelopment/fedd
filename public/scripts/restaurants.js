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
        $restaurantsList.append(json);
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

    function appendSongError(err) {
        console.log("not appended", err)
    }



    //////////   ERROR FUNCTION   //////////
    function apiError(e) {
        console.log('api error, is the server working?');
        // $('#restaurantTarget').text('api error, is the server working?');
    }


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
