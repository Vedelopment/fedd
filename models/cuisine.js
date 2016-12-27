var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

//Set up Cuisine Schema
var CuisineSchema = new Schema({
  name: String,
  dietary: [String]
});




//Set up Cuisine model
var Cuisine = mongoose.model('Cuisine', CuisineSchema);

module.exports = Cuisine;
