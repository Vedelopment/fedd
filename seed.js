var db = require('./models');

//////////   RESTAURANT SEED DATA   //////////
var restaurant_list = [{
    name: 'Shizen',
    description: 'Vegan Sushi Bar and Izakaya',
    address: '370 14th St, San Francisco, CA 94103',
    dietary: {
      vegetarian: 1,
      vegan: 1,
      glutenFree: 1,
      dairyFree: 1,
      nutAllergy: 0,
      kosher: 0
    },
    url: 'https://www.yelp.com/biz/shizen-vegan-sushi-bar-and-izakaya-san-francisco',
    coordinates: {
      lat: 37.768576,
      lng: -122.421622
    }
}, {
    name: 'Shangri-La',
    description: 'Chinese eatery serving vegetarian, vegan & kosher dishes.',
    address: '2026 Irving St, San Francisco, CA 94122',
    dietary: {
      vegetarian: 1,
      vegan: 1,
      glutenFree: 0,
      dairyFree: 1,
      nutAllergy: 0,
      kosher: 1
    },    url: 'http://www.shangrilavgrest.com/',
    coordinates: {
      lat: 37.763665,
      lng: -122.479805
    }
}, {
    name: 'Chipotle Mexican Grill',
    description: 'Fast-food chain offering Mexican fare, including design-your-own burritos, tacos & bowls.',
    address: '232 O\'Farrell St, San Francisco, CA 94102',
    dietary: {
      vegetarian: 1,
      vegan: 1,
      glutenFree: 1,
      dairyFree: 1,
      nutAllergy: 1,
      kosher: 1
    },    url: 'https://chipotle.com/allergens',
    coordinates: {
      lat: 37.786536,
      lng: -122.408587
    }
}, {
    name: 'Gracias Madre',
    description: 'Vegan Mexican Cuisine',
    address: '2211 Mission St, San Francisco, CA 94110',
    dietary: {
      vegetarian: 1,
      vegan: 1,
      glutenFree: 1,
      dairyFree: 1,
      nutAllergy: 0,
      kosher: 0
    },
    url: 'http://gracias-madre.com/',
    coordinates: {
      lat: 37.761800,
      lng: -122.419069
    }
}, {
    name: 'Cha-Ya',
    description: 'Vegan Sushi Restaurant',
    address: '762 Valencia St, San Francisco, CA 94110',
    dietary: {
      vegetarian: 1,
      vegan: 1,
      glutenFree: 1,
      dairyFree: 1,
      nutAllergy: 0,
      kosher: 0
    },
    url: 'http://www.thechaya.com/',
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
    dietary: {
      vegetarian: 1,
      vegan: 1,
      glutenFree: 1,
      dairyFree: 1,
      nutAllergy: 0,
      kosher: 0
    },
}, {
    name: 'Vietnamese',
    // dietary: 'vegetarian, vegan, gluten-free, dairy-free'
    dietary: {
      vegetarian: 1,
      vegan: 1,
      glutenFree: 1,
      dairyFree: 1,
      nutAllergy: 0,
      kosher: 0
    },
}, {
    name: 'Japanese',
    // dietary: 'vegetarian, gluten-free, dairy-free'
    dietary: {
      vegetarian: 1,
      vegan: 1,
      glutenFree: 1,
      dairyFree: 0,
      nutAllergy: 0,
      kosher: 0
    },
}, {
    name: 'South Indian',
    // dietary: 'vegetarian, vegan, gluten-free, dairy-free'
    dietary: {
      vegetarian: 1,
      vegan: 1,
      glutenFree: 1,
      dairyFree: 1,
      nutAllergy: 0,
      kosher: 0
    },
}, {
    name: 'Mexican',
    // dietary: 'vegetarian'
    dietary: {
      vegetarian: 1,
      vegan: 0,
      glutenFree: 0,
      dairyFree: 0,
      nutAllergy: 0,
      kosher: 0
    },
}, {
    name: 'Chinese',
    // dietary: 'vegetarian, dairy-free'
    dietary: {
      vegetarian: 1,
      vegan: 0,
      glutenFree: 0,
      dairyFree: 1,
      nutAllergy: 0,
      kosher: 0
    },
}, {
    name: 'Buddhist',
    // dietary: 'vegetarian'
    dietary: {
      vegetarian: 1,
      vegan: 0,
      glutenFree: 0,
      dairyFree: 0,
      nutAllergy: 0,
      kosher: 0
    },
}, {
    name: 'Greek',
    // dietary: 'vegetarian, gluten-free'
    dietary: {
      vegetarian: 1,
      vegan: 0,
      glutenFree: 1,
      dairyFree: 0,
      nutAllergy: 0,
      kosher: 0
    },
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
