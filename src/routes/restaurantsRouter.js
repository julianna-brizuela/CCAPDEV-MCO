/**
 * This module handles all the routes related to the restaurants.
 */
const { Router } = require('express');
const restaurantRouter = Router();
const data = require('./data');

//this matches the restaurant_route (which is in lowercase and without spaces) with an entry of the restaurants objects in data.js
restaurantRouter.get('/browse', (req, res) => {

   res.render("restaurant-list", {
        title: "MUNCH | Where your cravings are served!",
        tags: data.tags,
        restaurants: data.restaurants,
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

    let restaurant = data.restaurants.find(validRestaurant);

    res.locals.title = "MUNCH | " + restaurant.restaurant_name;
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

    let restaurant = data.restaurants.find(validRestaurant);

    res.locals.title = "MUNCH | Write a Review for " + restaurant.restaurant_name;
    res.render("writeareview", restaurant);
});

restaurantRouter.post('/:restaurant/writeareview', (req, res) => {
    //TODO: retrieve data from the form and input it into the database
});

module.exports = restaurantRouter;
