/**
 * This module handles all the routes related to the restaurants.
 */
const { Router } = require('express');
const restaurantRouter = Router();
const database = require('../../db/database.js');

//this matches the restaurant_route (which is in lowercase and without spaces) with an entry of the restaurants objects in data.js
restaurantRouter.get('/browse', (req, res) => {

   res.render("restaurant-list", {
        title: "MUNCH | Where your cravings are served!",
        tags: database.collections['tags'].documents[0]['tags'],
        restaurants: database.collections['restaurants'].documents
    });
});

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
        //console.log(restaurant.resto_reviews);

    }
    res.render("restaurant", restaurant);
});

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
        console.log(database.collections['reviews'])

        //checking if it inserted correctly
        if (prev_length < database.collections['reviews'].getLength()) {
            res.sendStatus(200);
            if (restaurant) {
                const update = await database.collections['restaurants'].updateOne({restaurant_name: restaurant.restaurant_name}, {resto_reviews: database.collections['reviews'].find({restaurant: restaurant.restaurant_name})});
                
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
