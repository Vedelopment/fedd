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
The code below passes all checkbox values to server and converts them to 0 or 1.
<hr>
```javascript
// CREATE DIETARY OBJECT FROM CHECKBOX INPUT, TURN ON/OFF VALUE TO 1/0 VALUE
var dietaryTags = "";
$('input[type=checkbox]').each(function () {
   var key = $(this).attr('class');
   var thisVal = (this.checked ? 1 : 0);
   newData.dietary[key] = thisVal;
});
```

### Screen Shots
<img src="http://i.imgur.com/KgRiwtT.png" width="600">
<img src="http://i.imgur.com/FfCdEoa.png" width="600">

### Contributors
[LD Dean](https://github.com/Vedelopment) & [Zach Cusimano](https://github.com/c00z)
