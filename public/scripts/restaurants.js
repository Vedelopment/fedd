console.log('sanity check!');

var MODAL_SELECTOR = '#myModal';
var restaurantTemplate;
var $restaurantsList;
var allRestaurants = [];
var Restaurants = [];

$(document).ready(function() {

    //////////   SUBMIT NEW RESTAURANT   //////////

    // PREVENT ENTER KEY FROM SUBMITTING FORM IN INPUT FIELD
    $('#newRestaurantForm').on('keyup keypress', function(e) {
      var keyCode = e.keyCode || e.which;
      if (keyCode === 13) {
        e.preventDefault();
        return false;
      }
    });

    // SUBMIT FORM ON BUTTON CLICK ONLY
    $('.restaurant-add').click(function(event) {

        // BUTTON CLICK CALLS FORM SUBMIT
        $('#newRestaurantForm').submit(function(event) {
          event.preventDefault();

          // CREATE QUERY STRING FROM CHECKBOX INPUT
          var dietaryTags = "";
          $('input[type=checkbox]').each(function () {
             var key = $(this).attr('class');
             var thisVal = (this.checked ? "1" : "0");
             dietaryTags += (dietaryTags=="" ? key + "=" + thisVal : "&" + key + "=" + thisVal);
          });

          // CREAT QUERY STRING FROM FORM DATA
          var formData = $('#newRestaurantForm').serialize();

          // JOIN CHECKBOX QUERY STRING AND OTHER FORM DATA QUERY STRING
          var submitData = dietaryTags + "&" + formData;

          // POST REQUEST USING JOINED QUERY STRING
          $.ajax({
             method: 'POST',
             url: '/api/restaurants',
             data: submitData,
             success: newRestaurantSuccess,
             error: apiError
          });
        });
    });

    //////////   UDPATE RESTAURANT   //////////
    $('#updateRestaurantForm').submit(function(event) {
        event.preventDefault();

        // FIND ID OF RESTAURANT THAT OPENS MODAL
        var restId = $(MODAL_SELECTOR).data('id');

        // CREATE OBJECT TO UPDATE RESTAURANT
        var newData = {};
        console.log("We just created ", newData);
        var dataObj = $(this).serializeArray().forEach(function(item) {
            newData[item.name] = item.value;
        });
        newData.dietary = {};

        // CREATE DIETARY OBJECT FROM CHECKBOX INPUT, TURN ON/OFF VALUE TO 1/0 VALUE
        var dietaryTags = "";
        $('input[type=checkbox]').each(function () {
           var key = $(this).attr('class');
           var thisVal = (this.checked ? 1 : 0);
           newData.dietary[key] = thisVal;
        });

        // REMOVE CHECKBOX ON/OFF VALUES FROM FORM SUBMIT OBJECT
        delete newData.vegBox;
        delete newData.veganBox;
        delete newData.glutenBox;
        delete newData.dairyBox;
        delete newData.nutBox;
        delete newData.koshBox;

        // PUT REQUEST WITH UPDATE RESTAURANT DATA OBJECT
        $.ajax({
           method: 'PUT',
           url: '/api/restaurants/' + restId,
           data: newData,
           success: updateRestaurantSuccess,
           error: apiError
        });

        // CLOSE MODAL
        $(MODAL_SELECTOR).modal('toggle');
    });

    //////////   DELETE RESTAURANT   //////////
    $('#restaurantTarget').on("click", ".deleteRestaurantButton", function(event){

        // FIND RESTAURANT ID
        var restId = $(this).closest('.content-card').data('id');

        // DELETE REQUEST FOR RESTAURANT MATCHING REQ ID
        $.ajax({
            method: 'DELETE',
            url: '/api/restaurants/' + restId,
            data: 'json',
            success: deleteRestaurantSuccess,
            error: apiError
        });
    });

    /////////////////////////////////////////////////////////////
    //////////////////   SUCCESS FUNCTIONS   ////////////////////
    /////////////////////////////////////////////////////////////

    //////////   LOAD ALL RESTAURANTS SUCCESS FUNCTION   //////////
    function handleRestaurantsLoadSuccess(allRestaurants) {
        $restaurantsList.empty();
        allRestaurants.forEach(function(restaurantData) {
            restaurantHtml = restaurantTemplate({
                restaurant: restaurantData
            });
            $restaurantsList.append(restaurantHtml);

        })
    };

    // FUTURE CODE
    // //////////   LOAD NEW RESTAURANT SUCCESS FUNCTION   //////////
    // function handleNewRestaurantSuccess(Restaurants) {
    //   db.Restaurant.findOne({name: req.params.name},function(restaurantData) {
    //       console.log(restaurantData);
    //       restaurantHtml = restaurantTemplate({
    //           restaurant: restaurantData
    //       });
    //       $restaurantsList.append(restaurantHtml);
    //
    //   })
    // };

    //////////   ADD NEW RESTAURANT SUCCESS FUNCTION   //////////
    function newRestaurantSuccess(json) {

        console.log('new restaurant success called')
        $restaurantsList.empty();
        allRestaurants.push(json);
        $('#newRestaurantForm input').val('');
        $('input:checkbox').removeAttr('checked');
        alert('Thank you for adding a restaurant!');
        window.location.href = "restaurants";

        // FUTURE CODE
        //////////   HANDLEBARS   //////////
        // $restaurantsList = $('#newRestaurantTarget');
        //
        // var restaurantSource = $('#restaurants-template').html();
        // restaurantTemplate = Handlebars.compile(restaurantSource);
        //
        // //////////   LOAD API SEED DATA AFTER NEW RESTAURANT ADDED   //////////
        // $.ajax({
        //     method: 'GET',
        //     url: '/api/restaurants',
        //     success: handleRestaurantsLoadSuccess,
        //     error: apiError,
        // });
    }

    //////////   UPDATE RESTAURANT SUCCESS FUNCTION   //////////
    function updateRestaurantSuccess(json) {
        console.log('update restaurant success called')

        alert('Thank you for updating this restaurant!');
        window.location.href = "restaurants";
    }

    //////////   DELETE RESTAURANT SUCCESS FUNCTION   //////////
    function deleteRestaurantSuccess(response) {

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
        var dietaryTags = "";
        $('input[type=checkbox]').each(function () {
          var key = $(this).attr('class');
          var thisVal = (this.checked ? "1" : "0");
          dietaryTags += (dietaryTags=="" ? "{" + key + ":" + thisVal : ", " + key + ":" + thisVal);
        });
        var dietaryTags = dietaryTags + "}";

        var data = {
            id: id,
            name: name,
            url: url,
            description: description,
            address: address,
            dietary: dietaryTags
        }

        /// Selecting all elements ///
        var $modal = $(MODAL_SELECTOR);
            $description = $modal.find('input[name=description]'),
            $name = $modal.find('input[name=name]'),
            $address = $modal.find('input[name=address]'),
            $url = $modal.find('input[name=url]');

        /// Setting all elements in modal to display previous information ///
        $modal.data('id', data.id);
        $description.val(data.description);
        $name.val(data.name);
        $address.val(data.address);
        // $dietary.val(data.dietary);
        $url.val(data.url);
    }

    /// Click handler for the restaurant modal  ///
    $('body').on('click', 'button.restaurant-edit', setModalData);

});
