var db = require('./models');

//////////   RESTAURANT SEED DATA   //////////
var restaurant_list = [{
    name: 'Shizen',
    description: 'Vegan Sushi Bar and Izakaya',
    address: '370 14th St, San Francisco, CA 94103',
    dietary: 'vegetarian, vegan, gluten-free, dairy-free',
    url: 'https://www.yelp.com/biz/shizen-vegan-sushi-bar-and-izakaya-san-francisco'
}, {
    name: 'Gracias Madre',
    description: 'Vegan Mexican Cuisine',
    address: '2211 Mission St, San Francisco, CA 94110',
    dietary: 'vegetarian, vegan, gluten-free, dairy-free',
    url: 'http://gracias-madre.com/'
}, {
    name: 'Cha-Ya',
    description: 'Vegan Sushi Restaurant',
    address: '762 Valencia St, San Francisco, CA 94110',
    dietary: 'vegetarian, vegan, gluten-free, dairy-free',
    url: 'http://www.thechaya.com/'
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
