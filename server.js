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
            method: "PATCH",
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
    var restaurantInfo = {
        name: req.body.name,
        description: req.body.description,
        address: req.body.address,
        dietary: req.body.dietary,
        url: req.body.url
    };
    var newRestaurant = new db.Restaurant(restaurantInfo);
    newRestaurant.save(function(err, restaurant) {
        if (err) {
            response.status(500).send('database error');
            return console.log('error', err);
        } else {
            res.json(restaurant);
        }
    });
});

//UPDATE RESTAURANT LISTING
app.patch('/api/restaurants/:id', function(req, res) {
    db.Restaurant.findOne({
        _id: req.params.id
    }, function(err, foundRestaurant) {
        if (err) {
            res.status(500).send('error: ');
        } else {
            foundRestaurant.name = req.body.name || foundRestaurant.name;
            foundRestaurant.description = req.body.description || foundRestaurant.description;
            foundRestaurant.address = req.body.address || foundRestaurant.address;
            foundRestaurant.dietary = req.body.dietary || foundRestaurant.dietary;
            foundRestaurant.url = req.body.url || foundRestaurant.url;

            foundRestaurant.save(function(err, savedRestaurant) {
                if (err) {
                    response.status(500).send('database error');
                } else {
                    res.json(foundRestaurant);
                }
            })
        }
    });
});

//DELETE RESTAURANT
app.delete('/api/Restaurants/:id', function (req, res) {
  // get Restaurant id from url params (`req.params`)
  console.log('Restaurants delete', req.params);
  var RestaurantId = req.params.id;
  // find the index of the Restaurant we want to remove
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


// ADD ALL Restaurants to MAP
//
app.get('/api/restaurants', function maps(req, res) {
  console.log('server map get');
  db.Restaurant.find(function(err, restaurants) {
    if (err) {
      return console.log('error with maps controller: ' + err);
    }
    var responseList = [];
    restaurants.forEach(function(element, index, array) {
      var subArray = [];
      subArray.push(element.lat);
      subArray.push(element.lon);
      // subArray.push(element.address);
      responseList.push(subArray);
    })
    res.send(responseList);
  })
});



/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function() {
    console.log('Express server is up and running on http://localhost:3000/');
});
