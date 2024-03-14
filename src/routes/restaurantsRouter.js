/**
 * This module handles all the routes related to the restaurants.
 */
const { Router } = require('express');
const restaurantRouter = Router();
const data = require('./data');

restaurantRouter.get("/browse", (req, res) => {

   res.render("restaurant-list", {
        title: "MUNCH | Where your cravings are served!",
        tags: data.tags,
        restaurants: data.restaurants,

        helpers: {
            toLink: function (text) { 
                      text = text.replace(/\s/g, '');
                      return text.toLowerCase(); 
                  }
          }
    });
});

restaurantRouter.get("/:restaurant", (req, res) => {
    let restaurant_route = req.params.restaurant;

    //this matches the restaurant_route (which is in lowercase and without spaces) with an entry of the restaurants objects in data.js
    function validRestaurant(restaurant) {
        let restaurant_name = restaurant.restaurant_name;
        restaurant_name = restaurant_name.replace(/\s/g, '');
        restaurant_name = restaurant_name.toLowerCase();
        return restaurant_name===restaurant_route;
    }

    let restaurant = data.restaurants.find(validRestaurant);

    res.render("restaurant", restaurant);

});

module.exports = restaurantRouter;
