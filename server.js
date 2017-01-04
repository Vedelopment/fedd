// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
//gets info from body where we usually get form data
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/restaurants', function cuisinespage(req, res) {
    res.sendFile(__dirname + '/views/restaurants.html');
});

app.get('/cuisines', function cuisinespage(req, res) {
    res.sendFile(__dirname + '/views/cuisines.html');
});

app.get('/map', function mappage(req, res) {
    res.sendFile(__dirname + '/views/map.html');
});

app.get('/add-restaurant', function mappage(req, res) {
    res.sendFile(__dirname + '/views/add-restaurant.html');
});

app.get('/about', function mappage(req, res) {
    res.sendFile(__dirname + '/views/about.html');
});

/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
    res.json({
        message: "Welcome to the FEDD api! Here's what you need to know, RJ, Ryan and Michael!",
        documentationUrl: "https://github.com/Vedelopment/fedd/blob/skateboard-v1/README.md",
        baseUrl: "https://vedelopment.herokuapp.com/",
        endpoints: [{
            method: "GET",
            path: "/api",
            description: "All available endpoints"
        }, {
            method: "GET",
            path: "/api/about",
            description: "What we can do for your gut."
        }, {
            method: "GET",
            path: "/api/restaurants",
            description: "Where to eat!"
        }, {
            method: "GET",
            path: "/api/restaurants/:id",
            description: "Restaurant Information"
        }, {
            method: "POST",
            path: "/api/restaurants",
            description: "Add a restaurant to our database."
        }, {
            method: "PUTCH",
            path: "/api/restaurants/:id",
            description: "Update Restaurant Information."
        }, {
            method: "DELETE",
            path: "/api/restaurants/:id",
            description: "Remove this Restaurant."
        }]
    })
});

/**************
 * API ROUTES *
 **************/

// GET ALL RESTAURANTS
app.get('/api/restaurants', function(req, res) {
    db.Restaurant.find(function(err, restaurants) {
        if (err) {
            return console.log("index error: " + err);
        }
        res.json(restaurants);
    });
});

// CREATE A NEW RESTAURANT
app.post('/api/restaurants', function(req, res) {
    console.log('new restaurant server req')
    // PARSE REQ DATA
    var veg = JSON.parse(req.body.vegetarian);
    var vegan = JSON.parse(req.body.vegan);
    var gluten = JSON.parse(req.body.glutenFree);
    var dairy = JSON.parse(req.body.dairyFree);
    var nut = JSON.parse(req.body.nutAllergy);
    var kosher = JSON.parse(req.body.kosher);
    // ASSIGN REQ VARIABLE VALUES TO OBJECT KEYS
    var restaurantInfo = {
        name: req.body.name,
        description: req.body.description,
        address: req.body.address,
        dietary: {
          vegetarian: veg,
          vegan: vegan,
          glutenFree: gluten,
          dairyFree: dairy,
          nutAllergy: nut,
          kosher: kosher
          },
        url: req.body.url
    };
    // CREATE NEW RESTAURANT INSTANCE AND SAVE
    var newRestaurant = new db.Restaurant(restaurantInfo);
    newRestaurant.save(function(err, restaurant) {
        if (err) {
            response.status(500).send('database error');
            return console.log('error', err);
        } else {
            // CONSOLE LOG AND RESPOND WITH NEW RESTAURANT DATA
            console.log('created new restaurant: ' + restaurant);
            res.json(restaurant);
        }
    });
});

//UPDATE RESTAURANT LISTING
app.put('/api/restaurants/:id', function(req, res) {
    db.Restaurant.findOne({
        _id: req.params.id
    }, function(err, foundRestaurant) {
        if (err) {
            res.status(500).send('error: ');
        } else {
            // UPDATE THESE RESTAURANT KEYS WITH NEW REQ VALUES
            foundRestaurant.name = req.body.name;
            foundRestaurant.description = req.body.description;
            foundRestaurant.address = req.body.address;
            foundRestaurant.dietary = req.body.dietary;
            foundRestaurant.url = req.body.url;

            // UPDATE RESTAURANT AND SAVE
            foundRestaurant.save(function(err, foundRestaurant) {
                if (err) {
                    response.status(500).send('database error');
                } else {
                    // CONSOLE LOG AND RESPOND WITH UPDATED RESTAURANT NAME
                    console.log('updated ' + req.body.name);
                    res.json(foundRestaurant);
                }
            });
        }
    });
});

//DELETE RESTAURANT
app.delete('/api/Restaurants/:id', function (req, res) {
  // GET RESTAURANT ID FROM URL PARAMS (`req.params`)
  console.log('Restaurants delete', req.params);
  var RestaurantId = req.params.id;
  // FIND THE INDEX OF THE RESTAURANT WE WANT TO REMOVE
  db.Restaurant.findOneAndRemove({ _id: RestaurantId }, function (err, deletedRestaurant) {
    res.json(deletedRestaurant);
  });
});

// GET ALL CUISINES
app.get('/api/cuisines', function(req, res) {
    db.Cuisine.find(function(err, restaurants) {
        if (err) {
            return console.log("index error: " + err);
        }
        res.json(restaurants);
    });
});

// FUTURE CODE
// ADD ALL Restaurants to MAP
//
// app.get('/api/restaurants', function maps(req, res) {
//   console.log('server map get');
//   db.Restaurant.find(function(err, restaurants) {
//     if (err) {
//       return console.log('error with maps controller: ' + err);
//     }
//     var responseList = [];
//     restaurants.forEach(function(element, index, array) {
//       var subArray = [];
//       subArray.push(element.lat);
//       subArray.push(element.lon);
//       // subArray.push(element.address);
//       responseList.push(subArray);
//     })
//     res.send(responseList);
//   })
// });



/**********
 * SERVER *
 **********/
// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function() {
    console.log('Express server is up and running on http://localhost:3000/');
});
