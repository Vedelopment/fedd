var mongoose = require("mongoose");
mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/fedd-api");

module.exports.Restaurant = require("./restaurant.js");
module.exports.Cuisine = require("./cuisine.js");
