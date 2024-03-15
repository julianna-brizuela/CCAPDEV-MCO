/**
 * This module handles all the routes related to the restaurants.
 */
const { Router } = require('express');
const restaurantRouter = Router();
const database = require('../../db/database.js');

//GET for Viewing All Restaurants
restaurantRouter.get('/browse', (req, res) => {

   res.render("restaurant-list", {
        title: "MUNCH | Where your cravings are served!",
        tags: database.collections['tags'].documents[0]['tags'],
        restaurants: database.collections['restaurants'].documents
    });
});

//GET for Viewing a Restaurant
restaurantRouter.get('/:restaurant', (req, res) => {
    let restaurant_route = req.params.restaurant;

    function validRestaurant(restaurant) {
        let restaurant_name = restaurant.restaurant_name;
        restaurant_name = restaurant_name.replace(/\s/g, '');
        restaurant_name = restaurant_name.toLowerCase();
        return restaurant_name===restaurant_route;
    }

    let restaurant = database.collections['restaurants'].documents.find(validRestaurant);

    if (restaurant) {
        res.locals.title = "MUNCH | " + restaurant['restaurant_name'];
    }
    res.render("restaurant", restaurant);
});

//POST for Adding a Photo or Saving
restaurantRouter.post('/:restaurant', async (req, res) => {
    //when a user saves a restaurant into their profile
    let restaurant_route = req.body.restaurant_name;

    let user = database.collections['users'].documents[0]
    //console.log(user)

    try {
        //update the users profile to include the new restaurant
        const update = await database.collections['users'].updateOne({username: 'Josh_Hutcherson' }, {
            //based on the average, get the new number of stars
            
            favorites: newFaves = function() {
                let arr = database.collections['users'].find({username: 'Josh_Hutcherson' })['favorites'];

                arr.push(req.body.restaurant_name);
                console.log("ARRAY")
                console.log(arr)
                return arr;
            }
        });
    } catch (err) {
        console.log(err);
    }
})

//GET for Writing a Review
restaurantRouter.get('/:restaurant/writeareview', (req, res) => {
    let restaurant_route = req.params.restaurant;

    function validRestaurant(restaurant) {
        let restaurant_name = restaurant.restaurant_name;
        restaurant_name = restaurant_name.replace(/\s/g, '');
        restaurant_name = restaurant_name.toLowerCase();
        return restaurant_name===restaurant_route;
    }

    let restaurant = database.collections['restaurants'].documents.find(validRestaurant);

    if(restaurant) {
        res.locals.title = "MUNCH | Write a Review for " + restaurant['restaurant_name'];
    }

    res.render("writeareview", restaurant);
});

//POST for Writing a Review (DO NOT TOUCH)
restaurantRouter.post('/:restaurant/writeareview', async (req, res) => {
    let restaurant_route = req.body.restaurant;

    function validRestaurant(restaurant) {
        let restaurant_name = restaurant.restaurant_name;
        return restaurant_name===restaurant_route;
    }

    const prev_length = database.collections['reviews'].getLength();
    let restaurant = database.collections['restaurants'].documents.find(validRestaurant);

    try {
        //inserts new entry into the database
        const review = await database.collections['reviews'].insertOne(req.body);

        //checking if it inserted correctly
        if (prev_length < database.collections['reviews'].getLength()) {
            res.sendStatus(200);
            if (restaurant) {
                const update = await database.collections['restaurants'].updateOne({restaurant_name: restaurant.restaurant_name}, {
                    resto_reviews: database.collections['reviews'].find({restaurant: restaurant.restaurant_name}), 
                    review_num: database.collections['reviews'].find({restaurant: restaurant.restaurant_name}).length,

                    //get the average of all ratings thus far
                    rating: average = function() {
                        const len = database.collections['reviews'].find({restaurant: restaurant.restaurant_name}).length;
                        const arr = database.collections['reviews'].find({restaurant: restaurant.restaurant_name})
                        let avg = 0
                        for (let i = 0; i < len; i++) {
                            avg = avg + arr[i].review_rating
                        }

                        avg = avg / len

                        return avg.toPrecision(3)
                    },
                    //based on the average, get the new number of stars
                    star: stars = function() {

                        function avg(len, arr) {
                            let avg = 0
                            for (let i = 0; i < len; i++) {
                                avg = avg + arr[i].review_rating
                            }
    
                            avg = avg / len

                            return avg.toPrecision(3)
                        }

                        let average = avg(database.collections['reviews'].find({restaurant: restaurant.restaurant_name}).length, database.collections['reviews'].find({restaurant: restaurant.restaurant_name}))


                        //taken from: https://stackoverflow.com/questions/6137986/javascript-roundoff-number-to-nearest-0-5
                        function round(value, step) {
                            step || (step = 1.0);
                            var inv = 1.0 / step;
                            return Math.round(value * inv) / inv;
                        }

                        average = round(average, 0.5);

                        switch (average) {
                            case 0:
                                return ['blank-star','blank-star','blank-star','blank-star','blank-star']
                            case 0.5:
                                return ['half-star','blank-star','blank-star','blank-star','blank-star']
                            case 1:
                                return ['star','blank-star','blank-star','blank-star','blank-star']
                            case 1.5:
                                return ['star','half-star','blank-star','blank-star','blank-star']
                            case 2:
                                return ['star','star','blank-star','blank-star','blank-star']
                            case 2.5:
                                return ['star','star','half-star','blank-star','blank-star']
                            case 3:
                                return ['star','star','star','blank-star','blank-star']
                            case 3.5:
                                return ['star','star','star','half-star','blank-star']
                            case 4:
                                return ['star','star','star','star','blank-star']
                            case 4.5:
                                return ['star','star','star','star','half-star']
                            case 5:
                                return ['star','star','star','star','star']

                        }

                    }
                });
            }
        } else {
            res.sendStatus(500);
        }
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
    
});

module.exports = restaurantRouter;
