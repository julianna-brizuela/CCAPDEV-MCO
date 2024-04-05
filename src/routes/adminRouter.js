const express = require('express');
const adminRouter = express.Router();
const database = require('../../db/database.js');

const Restaurants = require('../models/Restaurants.js');
const Admins = require('../models/Admins.js');
const Reviews = require('../models/Reviews.js');
const { requireAuth } = require('../middleware/auth.js');
const { restrictToOwnProfile } = require('../middleware/restrict-profile.js');

function toLink(str) {
    return str.toLowerCase().replace(/\s+/g, '');
}

adminRouter.get("/:username/restaurant", requireAuth, restrictToOwnProfile, async (req, res) => {
    let username = req.params.username;
    username = decodeURIComponent(username);

    try {
        const admin = await Admins.findOne({"username": username});
         
        if(admin){
            const adminRestaurant = await Restaurants.findById(admin.owned_restaurant).lean()
            const restaurantReviews = await Reviews.find({"restaurant": adminRestaurant}).lean().populate({
                path:'reviewer'
            }).exec()

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
    try {
        const reviewID = req.body.reviewID;
        const ownerResponse = req.body.owner_response
        const updatedReview = await Reviews.findByIdAndUpdate(
                reviewID,
                {owner_response: ownerResponse},
                {new: true},
        );
    } catch (error) {
        console.error('Error updating owner response:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = adminRouter;