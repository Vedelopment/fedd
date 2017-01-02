var mongoose = require("mongoose");
mongoose.connect(process.env.PORT || "mongodb://localhost/fedd-api" );

module.exports.Restaurant = require("./restaurant.js");
module.exports.Cuisine = require("./cuisine.js");
