var db = require('.models');

//////////   RESTAURANT SEED DATA   //////////
var restaurant_list = [{
            name: 'Shizen',
            description: 'Vegan Sushi Bar and Izakaya',
            address: '370 14th St, San Francisco, CA 94103',
            dietary: 'vegetarian, vegan, gluten-free, dairy-free'
        }, {
            name: 'Gracias Madre',
            description: 'Vegan Mexican Cuisine',
            address: '2211 Mission St, San Francisco, CA 94110',
            dietary: 'vegetarian, vegan, gluten-free, dairy-free'
        }, {
            name: 'Cha-Ya',
            description: 'Vegan Sushi Restaurant',
            address: '762 Valencia St, San Francisco, CA 94110',
            dietary: 'vegetarian, vegan, gluten-free, dairy-free',
        ]

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
