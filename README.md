# FEDD - [Live Link](https://getfedd.herokuapp.com/)

<img src="https://cloud.githubusercontent.com/assets/7833470/10423298/ea833a68-7079-11e5-84f8-0a925ab96893.png" width="100">

## Get FEDD

####Free Easy Dietary Directory

<i> Full Stack App built for WDI's Project 1 </i>

Fedd is a simple way to search for restaurants based on dietary preferences.

Users are able to search based on one or multiple dietary tags, contribute to our online restaurant database and see where they're located using Google Maps API. We hope this site will save our users the time and frustration that comes with trying to find a safe place to eat.

Feel free to fork / star / watch for your own personal use.

See the published project at [getfedd.herokuapp.com](https://getfedd.herokuapp.com/)!

#Technologies Used   
Mongoose, MongoDBs
####Languages:
HTML5, JavaScript, CSS
####External Libraries:
jQuery, Bootstrap
####API's:
Google Maps API
####Frameworks:
Express



## Code We're Proud Of
<hr>
The code below was tricky. We wanted to filter restaurants and include ones that satisfied the user's dietary tag requests. One function had to compare each checkbox value with the restaurant value. To be able to ignore a tag if it wasn't selected we changed the restaurant tag value to 0 or 1 as well as the checkbox values. If the box was not checked, the statement for that tag would return true and thus be ignored, regardless of the restaurant value.
<hr>
```javascript
// FILTER RESTAURANTS
allRestaurants.forEach(function(restaurantData) {
    if (
        // ALL MUST BE TRUE TO RETURN RESTAURANT, EACH STATEMENT IS ONLY FALSE IF SEARCH ARRAY VALUE IS "1" AND RESTAURANT DIETARY VALUE IS "0"
        searchArray.vegetarian <= restaurantData.dietary.vegetarian &&
        searchArray.vegan <= restaurantData.dietary.vegan &&
        searchArray.glutenFree <= restaurantData.dietary.glutenFree &&
        searchArray.dairyFree <= restaurantData.dietary.dairyFree &&
        searchArray.nutAllergy <= restaurantData.dietary.nutAllergy &&
        searchArray.kosher <= restaurantData.dietary.kosher
    ) {
        // RENDER SEARCH RESULTS IN HMTL
        restaurantHtml = restaurantTemplate({
            restaurant: restaurantData
        });
        $restaurantsList.append(restaurantHtml);

    };
});
```

### Screen Shots
<img src="http://i.imgur.com/KgRiwtT.png" width="600">
<img src="http://i.imgur.com/FfCdEoa.png" width="600">

### Contributors
[LD Dean](https://github.com/Vedelopment) & [Zach Cusimano](https://github.com/c00z)
