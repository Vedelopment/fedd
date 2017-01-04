var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

//Set up Restaurant Schema
var RestaurantSchema = new Schema({
  name: String,
  description: String, //stretch: validate less than 140 charac//
  address: String,
  dietary:
  // {},
  {
    vegetarian: Number,
    vegan: Number,
    glutenFree: Number,
    dairyFree: Number,
    nutAllergy: Number,
    kosher: Number
  },
  url: String,
  coordinates: {
    lat: Number,
  	lng: Number
  }
  //cuisine: []//stretch: relate these, eventually be able to filter results//
  //coord: some data //stretch: google maps//
  //rating: some data //stretch: javascript logic stuff//
});

//Set up Restaurant model
var Restaurant = mongoose.model('Restaurant', RestaurantSchema);

module.exports = Restaurant;
