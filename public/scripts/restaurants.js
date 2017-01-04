console.log('sanity check!');

var MODAL_SELECTOR = '#myModal';
var restaurantTemplate;
var $restaurantsList;
var allRestaurants = [];
var Restaurants = [];

$(document).ready(function() {

    //////////   SUBMIT NEW RESTAURANT   //////////
    $('#newRestaurantForm').on('keyup keypress', function(e) {
      var keyCode = e.keyCode || e.which;
      if (keyCode === 13) {
        e.preventDefault();
        return false;
      }
    });

    $('.restaurant-add').click(function(event) {
        $('#newRestaurantForm').submit(function(event) {
          event.preventDefault();
          var dietaryTags = "";
          $('input[type=checkbox]').each(function () {
             var key = $(this).attr('class');
             var thisVal = (this.checked ? "1" : "0");
             dietaryTags += (dietaryTags=="" ? key + "=" + thisVal : "&" + key + "=" + thisVal);
          });

          var formData = $('#newRestaurantForm').serialize();
          var submitData = dietaryTags + "&" + formData;
          console.log(submitData);

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
        var restId = $(MODAL_SELECTOR).data('id');
        var newData = {};
        console.log("We just created ", newData);
        var dataObj = $(this).serializeArray().forEach(function(item) {
            newData[item.name] = item.value;
        });
        newData.dietary = {};
        // console.log(typeof(data));
        // console.log(JSON.serializeArray(data));

        var dietaryTags = "";
        $('input[type=checkbox]').each(function () {
           var key = $(this).attr('class');
           var thisVal = (this.checked ? 1 : 0);
           newData.dietary[key] = thisVal;
          //  dietaryTags += (dietaryTags=="" ? key + "=" + thisVal : "&" + key + "=" + thisVal);
        });

        delete newData.vegBox;
        delete newData.veganBox;
        delete newData.glutenBox;
        delete newData.dairyBox;
        delete newData.nutBox;
        delete newData.koshBox;

        console.log("after tags added, ", newData);
        // var formData = $('#newRestaurantForm').serialize();
        // var submitData = dietaryTags + "&" + newData;
        // console.log(dietaryTags);
        // console.log(submitData);

        $.ajax({
           method: 'PUT',
           url: '/api/restaurants/' + restId,
           data: newData,
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
        // $restaurantsList.append(json);
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
        // $restaurantsList.empty();
        // allRestaurants.push(json);
        // $restaurantsList.append(json);
        alert('Thank you for updating this restaurant!');
        window.location.href = "restaurants";

        // var $article = $('article[data-id=' + response._id + ']');
        //
        // $article.find('.name a').text(response.name);
        // $article.find('.name a').attr('href', response.url);
        // $article.find('.description').text(response.description);
        // $article.find('.address').text(response.address);
        // $article.find('.dietary').html(response.dietary);
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
        var dietaryTags = "";
        $('input[type=checkbox]').each(function () {
          var key = $(this).attr('class');
          var thisVal = (this.checked ? "1" : "0");
          dietaryTags += (dietaryTags=="" ? "{" + key + ":" + thisVal : ", " + key + ":" + thisVal);
        });
        var dietaryTags = dietaryTags + "}";
        // console.log(typeof(dietaryTags));
        // console.log(dietaryTags);

        var data = {
            id: id,
            name: name,
            url: url,
            description: description,
            address: address,
            dietary: dietaryTags
            // dietary: {
            //   vegetarian: veg,
            //   vegan: vegan,
            //   glutenFree: gluten,
            //   dairyFree: dairy,
            //   nutAllergy: nut,
            //   kosher: kosher
            //   },
        }
        // console.log(data);

        /// Selecting all elements ///
        var $modal = $(MODAL_SELECTOR);
            $description = $modal.find('input[name=description]'),
            $name = $modal.find('input[name=name]'),
            $address = $modal.find('input[name=address]'),
            // $dietary = $modal.find('input[name=dietary]'),
            // $dietary = {
              // $vegetarian = $modal.find('input[name=vegetarianBox]'),
              // $vegan = $modal.find('input[name=veganBox]'),
              // $gluten = $modal.find('input[name=glutenBox]'),
              // $dairy = $modal.find('input[name=dairyBox]'),
              // $nut = $modal.find('input[name=nutBox]'),
              // $kosh = $modal.find('input[name=koshBox]'),
            // },
            $url = $modal.find('input[name=url]');

        // console.log($dietary);

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
