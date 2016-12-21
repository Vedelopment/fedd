var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

//Set up Restaurant Schema
var RestaurantSchema = new Schema({
  name: String,
  location: String,



//Set up Travel Model
var Travel = mongoose.model('Travel', TravelSchema);

module.exports = Travel;
