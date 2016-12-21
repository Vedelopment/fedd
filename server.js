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

/*
 * JSON API Endpoints
 */

app.get('/api', function api_index(req, res) {
  res.json({
    message: "Welcome to the FEDD api! Here's what you need to know, RJ, Ryan and Michael!",
    documentationUrl: "https://github.com/c00z/express-personal-api/blob/master/README.md",
    baseUrl: "https://c00z.herokuapp.com/",
    endpoints: [
      {method: "GET", path: "/api", description: "All available endpoints"},
      {method: "GET", path: "/api/profile", description: "My life, online"},
      {method: "GET", path: "/api/travels", description: "Where I've been"},
      {method: "GET", path: "/api/travels/:id", description: "Location Information"},
      {method: "POST", path: "/api/travels", description: "Add to my Wunderlust list"},
      {method: "PATCH", path: "/api/travels/:id", description: "Update Travel location"},
      {method: "DELETE", path: "/api/travels/:id", description: "Remove from my Wunderlust list"}
    ]
  })
});
