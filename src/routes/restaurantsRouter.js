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

restaurantRouter.get("restaurant/:restaurant", (req, res) => {
    res.render("restaurant", {
        
    });
});

module.exports = restaurantRouter;
