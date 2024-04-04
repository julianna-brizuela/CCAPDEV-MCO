const express = require('express');
const adminRouter = express.Router();
const database = require('../../db/database.js');

const Restaurants = require('#models/Restaurants.js');
const Admins = require('#models/Admins.js');
const Reviews = require('#models/Reviews.js');
const { requireAuth } = require('#middleware/auth.js');


function toLink(str) {
    return str.toLowerCase().replace(/\s+/g, '');
}

adminRouter.get("/:username/restaurant", requireAuth, async (req, res) => {
    let username = req.params.username;
    username = decodeURIComponent(username);

    // const admin = database.collections['admins'].find({username: username})[0];
    try {
        const admin = await Admins.findOne({"username": username});
        // const  
        if(admin){
            
            const adminRestaurant = await Restaurants.findById(admin.owned_restaurant).lean()
            console.log(adminRestaurant);

            const restaurantReviews = await Reviews.find({"restaurant": adminRestaurant}).lean()
            console.log(restaurantReviews);
            
            res.render("admin-restaurant", {
                title: "MUNCH | Where your cravings are served!",
                reviews: restaurantReviews,
                restaurant: adminRestaurant,
                toLink: toLink,
                nav_context: {
                    isLoggedIn: req.isAuthenticated(),
                }
            });
        } else {
            res.status(404).render('404_error_template', {title: "Sorry, page not found"});
        }
    } catch(err) {
        console.error(err);
        req.flash('error', 'An error occured. Please try again later.');
    }
    
});

 adminRouter.post("/:username/restaurant", async (req, res) => {
    console.log('HELLO')
    try {
        const { restaurant, reviewer_name, review_rating, date_of_review, review_description, owner_response } = req.body;

        database.collections['reviews'].updateOne({ reviewer_name: req.body.reviewer_name,
                                                    restaurant: req.body.restaurant,
                                                    review_description: req.body.review_description}, { owner_response: req.body.owner_response });
        documents = database.collections['reviews'].find({ reviewer_name: req.body.reviewer_name,
                                                            restaurant: req.body.restaurant,
                                                            review_description: req.body.review_description})[0];
    } catch (error) {
        console.error('Error updating owner response:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = adminRouter;