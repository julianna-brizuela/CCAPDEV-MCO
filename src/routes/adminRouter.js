const express = require('express');
const adminRouter = express.Router();
const data = require('./data');

//
adminRouter.get("/admin", (req, res) => {

    res.render("admin-restaurant-list", {
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
 
adminRouter.get("/admin/:username", (req, res) => {
    let username = req.params.username;

    const admin = data.admins.find(admin => admin.username === username);
    if(admin){
        const restaurantReviews = data.reviews.filter(review => review.restaurant === admin.restaurant_name)
        const adminRestaurant = data.restaurants.find(restaurant => restaurant.restaurant_name === admin.restaurant_name);
        const title = `MUNCH | ${admin.restaurant_name}`;
        res.render("admin-restaurant", {
            title: title,
            reviews: restaurantReviews,
            restaurant: adminRestaurant
        });
    } else {
        res.status(404).send('User not found');
    }
 });


module.exports = adminRouter;
