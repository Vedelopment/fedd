var db = require('./models');

//////////   RESTAURANT SEED DATA   //////////
var restaurant_list = [{
    name: 'Shizen',
    description: 'Vegan Sushi Bar and Izakaya',
    address: '370 14th St, San Francisco, CA 94103',
    dietary: [{
      vegetarian: true,
      vegan: true,
      glutenFree: true,
      dairyFree: true,
      nutAllergy: false,
      Kosher: false
    }],
    url: 'https://www.yelp.com/biz/shizen-vegan-sushi-bar-and-izakaya-san-francisco',
    coordinates: {
      lat: 37.768576,
      lng: -122.421622
    }
}, {
    name: 'Shangri-La',
    description: 'Chinese eatery serving vegetarian, vegan & kosher dishes.',
    address: '2026 Irving St, San Francisco, CA 94122',
    dietary: [{
      vegetarian: true,
      vegan: true,
      glutenFree: false,
      dairyFree: true,
      nutAllergy: false,
      Kosher: true
    }],    url: 'http://www.shangrilavgrest.com/'
}, {
    name: 'Chipotle Mexican Grill',
    description: 'Fast-food chain offering Mexican fare, including design-your-own burritos, tacos & bowls.',
    address: '232 O\'Farrell St, San Francisco, CA 94102',
    dietary: [{
      vegetarian: true,
      vegan: true,
      glutenFree: true,
      dairyFree: true,
      nutAllergy: true,
      Kosher: true
    }],    url: 'https://chipotle.com/allergens'
}, {
    name: 'Gracias Madre',
    description: 'Vegan Mexican Cuisine',
    address: '2211 Mission St, San Francisco, CA 94110',
    dietary: [{
      vegetarian: true,
      vegan: true,
      glutenFree: true,
      dairyFree: true,
      nutAllergy: false,
      Kosher: false
    }],
    url: 'http://gracias-madre.com/',
    coordinates: {
      lat: 37.761800,
      lng: -122.419069
    }
}, {
    name: 'Cha-Ya',
    description: 'Vegan Sushi Restaurant',
    address: '762 Valencia St, San Francisco, CA 94110',
    dietary: [{
      vegetarian: true,
      vegan: true,
      glutenFree: true,
      dairyFree: true,
      nutAllergy: false,
      Kosher: false
    }],    url: 'http://www.thechaya.com/',
    coordinates: {
      lat: 37.761006,
      lng: -122.421652
    }
}]


//////////   REMOVES AND CREATES RESTAURANT LIST   //////////
db.Restaurant.remove({}, function(err, restaurants) {
    if (err) {
        console.log('Error occurred in removing restaurants', err);
    } else {
        console.log('removed all restaurants');

        db.Restaurant.create(restaurant_list, function(err, restaurants) {
            if (err) {
                return console.log('Error occurred in creating restaurants', err);
            }
            console.log("created", restaurants.length, "restaurants");
            process.exit();
        });
    }
});

//////////   CUISINES SEED DATA   //////////
var cuisine_list = [{
    name: 'Thai',
    dietary: 'vegetarian, vegan, gluten-free, dairy-free'
}, {
    name: 'Vietnamese',
    dietary: 'vegetarian, vegan, gluten-free, dairy-free'
}, {
    name: 'Japanese',
    dietary: 'vegetarian, gluten-free, dairy-free'
}, {
    name: 'South Indian',
    dietary: 'vegetarian, vegan, gluten-free, dairy-free'
}, {
    name: 'Mexican',
    dietary: 'vegetarian'
}, {
    name: 'Chinese',
    dietary: 'vegetarian, dairy-free'
}, {
    name: 'Buddhist',
    dietary: 'vegetarian'
}, {
    name: 'Greek',
    dietary: 'vegetarian, gluten-free'
}]

//////////   REMOVES AND CREATES CUISINES LIST   //////////
db.Cuisine.remove({}, function(err, cuisines) {
    if (err) {
        console.log('Error occurred in removing cuisines', err);
    } else {
        console.log('removed all cuisines');

        db.Cuisine.create(cuisine_list, function(err, cuisines) {
            if (err) {
                return console.log('Error occurred in creating cuisines', err);
            }
            console.log("created", cuisines.length, "cuisines");
            process.exit();
        });
    }
});
