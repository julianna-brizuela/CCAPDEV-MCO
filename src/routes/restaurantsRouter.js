/**
 * This module handles all the routes related to the restaurants.
 */
const { Router } = require('express');
const restaurantRouter = Router();

//DATABASES
const Users = require("#models/Users.js");
const Admins = require("#models/Admins.js");
const Restaurants = require("#models/Restaurants.js");
const Reviews = require("#models/Reviews.js");
const Tags = require("#models/Tags.js");

//REMOVE LATER
const database = require('../../db/database.js');

const {nestedQuery, nestedQueryNoProject, getAverageRating } = require("#helpers/js-helpers.js");

//GET for Viewing All Restaurants
restaurantRouter.get('/browse', async (req, res) => {
    const restaurants = await Restaurants.find({}).lean().exec();

    //retrieves the tag_name field from the Tags collection
    const tags = await Tags.find({}, {tag_name:1, _id:0}).lean().exec();
    const tags_array = tags.map(tag => tag.tag_name.toString());

   res.render("restaurant-list", {
        title: "MUNCH | Where your cravings are served!",
        tags: tags_array,
        restaurants: restaurants,
        nav_context: {
            isLoggedIn: req.isAuthenticated(),
        },
    });
});

//GET for Viewing Filtered Restaurants
restaurantRouter.get('/browse/category=:category/filter=:filter', async (req, res) => {
   let category = req.params.category;
   let filter = req.params.filter;
   let restaurants = await Restaurants.find({}).lean().exec();

   switch (category) {
    case "price":
        switch(filter) {
            case "low":
                restaurants = await Restaurants.find({price: '₱'}).lean().exec();
                break;
            case "average":
                restaurants = await Restaurants.find({price: '₱₱'}).lean().exec();
                break;
            case "high":
                restaurants = await Restaurants.find({price: '₱₱₱'}).lean().exec();
                break;
            case "extreme":
                restaurants = await Restaurants.find({price: '₱₱₱₱'}).lean().exec();
                break;  
        }
        break;
    case "tags":
        let arr = []

        function findMatchingTags(restaurant) {
            let tempTags = []
            Object.assign(tempTags, restaurant.tags);

            for (let j = 0; j < tempTags.length; j++) {
                tempTags[j] = tempTags[j].replace(/\s/g, '');
                tempTags[j] = tempTags[j].toLowerCase();
            }

            if (tempTags.find(tag => tag === filter)) {
                return restaurant.restaurant_name;
            } else {
                return 0
            }
        }

        //TODO turn this into helper function
        async function push(arr) {
            for (let i = 0; i < restaurants.length; i++) {
                restaurantName = findMatchingTags(restaurants[i]);

                if (restaurantName !== 0) {
                    //pushes the restaurants whose tags match the filter into the array to be displayed
                    const restaurant = await Restaurants.find({restaurant_name: restaurantName}).lean().exec()
                    arr.push(restaurant);
                }
            }
            
            
            return arr.flat(1);
        }
    
        restaurants = await push([]);
        break;
    case "star":
        let star_filter = []
        switch (filter) {
            case "one":
                star_filter = ['star','blank-star','blank-star','blank-star','blank-star'];
                break;
            case "two":
                star_filter = ['star','star','blank-star','blank-star','blank-star'];
                break;
            case "three":
                star_filter = ['star','star','star','blank-star','blank-star'];
                break;
            case "four":
                star_filter = ['star','star','star','star','blank-star'];
                break;
            case "five":
                star_filter = ['star','star','star','star','star'];
                break;
        }

        function findMatchingStars(restaurant) {
            if (JSON.stringify(restaurant.star) == JSON.stringify(star_filter)) {
                console.log(restaurant.restaurant_name)
                return restaurant.restaurant_name
            }
            else {
                return 0
            }
        }

        async function pushIntoArray(arr) {
            for (let i = 0; i < restaurants.length; i++) {
                restaurantName = findMatchingStars(restaurants[i])
                if (restaurantName !== 0) {
                    const restaurant = await Restaurants.find({restaurant_name: restaurantName}).lean().exec()
                    arr.push(restaurant);
                }
            }
            return arr.flat(1);
        }

        restaurants = await pushIntoArray([]);

        break;
   }

    const tags = await Tags.find({}, {tag_name:1, _id:0}).lean().exec();
    const tags_array = tags.map(tag => tag.tag_name.toString());

    res.render("restaurant-list", {
         title: "MUNCH | Where your cravings are served!",
         tags: tags_array,
         restaurants: restaurants,
         nav_context: {
             isLoggedIn: req.isAuthenticated(),
         },
     });
 });

//GET for Viewing a Restaurant
restaurantRouter.get('/:restaurant', async (req, res) => {
    let restaurant_route = req.params.restaurant;

    let restaurant = await Restaurants.findOne({routeparameter: restaurant_route}).lean().populate({
        path: 'resto_reviews',
        populate: {
            path: 'reviewer',
        }
    }).exec();

    if (restaurant) {
        res.locals.title = "MUNCH | " + restaurant['restaurant_name'];
        res.render("restaurant", {
            restaurant: restaurant,
            nav_context: {
                isLoggedIn: req.isAuthenticated(),
            },
        });
    } else {
        res.status(404).render('404_error_template', {title: "Sorry, page not found"});
    }
});

//GET for Writing a Review
restaurantRouter.get('/:restaurant/writeareview', async (req, res) => {
    let restaurant_route = req.params.restaurant;
    let loggedIn = 0;

    if (req.isAuthenticated()) {
        loggedIn = 1;
        let restaurant = await Restaurants.findOne({routeparameter: restaurant_route}).lean().populate({
            path: 'resto_reviews',
            populate: {
                path: 'reviewer',
            }
        }).exec();

        if(restaurant) {
            res.locals.title = "MUNCH | Write a Review for " + restaurant['restaurant_name'];
            res.render("writeareview", {
                restaurant: restaurant, 
                nav_context: {
                    isLoggedIn: req.isAuthenticated(),
                },
            });
        } else {
            res.status(404).render('404_error_template', {title: "Sorry, page not found"});
        }
    } else {
        res.json({loggedIn, restaurant_route});
    }

    
});

//POST for Writing a Review (DO NOT TOUCH)
restaurantRouter.post('/:restaurant/writeareview', async (req, res) => {
    let restaurant_route = req.body.restaurant;

    const prev_length = Reviews.find({}).lean().exec().length;
    let restaurant = Restaurants.find({routeparameter: restaurant_route}).lean().exec();

    try {
        //inserts new entry into the database
        const review = await database.collections['reviews'].insertOne(req.body);

        //checking if it inserted correctly
        if (prev_length < database.collections['reviews'].getLength()) {
            const username = req.body['reviewer_name'];
            const name = database.collections['users'].find({ username })[0].name;
            res.status(200).json({ name });

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
