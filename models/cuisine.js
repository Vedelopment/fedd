var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

//Set up Cuisine Schema
var CuisineSchema = new Schema({
  name: String,
  dietary: {
    vegetarian: Number,
    vegan: Number,
    glutenFree: Number,
    dairyFree: Number,
    nutAllergy: Number,
    kosher: Number
  },
});

//Set up Cuisine model
var Cuisine = mongoose.model('Cuisine', CuisineSchema);

module.exports = Cuisine;
