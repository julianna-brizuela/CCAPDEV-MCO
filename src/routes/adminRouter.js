const express = require('express');
const adminRouter = express.Router();
const database = require('../../db/database.js');
let documents;


function toLink(str) {
    return str.toLowerCase().replace(/\s+/g, '');
}

adminRouter.get("/:username/restaurant", async (req, res) => {
    let username = req.params.username;
    username = decodeURIComponent(username);

    admin = database.collections['admins'].find({username: username})[0];
    if(admin){
        
        const restaurantReviews = database.collections['reviews'].find({restaurant: admin.restaurant_name});
        const adminRestaurant = database.collections['restaurants'].find({restaurant_name: admin.restaurant_name})[0];

        res.render("admin-restaurant", {
            title: "MUNCH | Where your cravings are served!",
            reviews: restaurantReviews,
            restaurant: adminRestaurant,
            toLink: toLink
        });
    } else {
        res.status(404).send('User not found');
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