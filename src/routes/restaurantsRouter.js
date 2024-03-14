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
    console.log("POST request received for /posts");
    console.log(req.body);

    
        
        // TODO 2.2: Find matching user document with the given Id
        const review = await database.collections['reviews'].insertOne(req.body);
        // TODO 2.4: if successful, send statuscode 200. Otherwise send 500.
        documents = database.collections['reviews'].find({restaurant: 'Botejyu'});
        console.log(documents);
        res.sendStatus(200);

    //TODO: retrieve data from the form and input it into the database
    
});

module.exports = restaurantRouter;
