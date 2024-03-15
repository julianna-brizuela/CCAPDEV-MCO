const express = require('express');
const adminRouter = express.Router();
const data = require('./data');
const database = require('../../db/database.js');
let documents;
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

 adminRouter.get("/admin/:username", async (req, res) => {
    let username = req.params.username;
    username = decodeURIComponent(username);

    admin = database.collections['admins'].find({username: username})[0];
    console.log(admin);
    if(admin){
        
        const restaurantReviews = database.collections['reviews'].find({restaurant: admin.restaurant_name});
        const adminRestaurant = database.collections['restaurants'].find({restaurant_name: admin.restaurant_name})[0];

        res.render("admin-restaurant", {
            title: "MUNCH | Where your cravings are served!",
            reviews: restaurantReviews,
            restaurant: adminRestaurant
        });
    } else {
        res.status(404).send('User not found');
    }
 });

 adminRouter.post("/admin/:username", async (req, res) => {
    try {
        const { restaurant, reviewer_name, review_rating, date_of_review, review_description, owner_response } = req.body;
        console.log("restaurant:", req.body.restaurant);
        console.log("name:", req.body.reviewer_name);
        console.log("ratineg:", req.body.review_rating);
        console.log("date:", req.body.date_of_review);
        console.log("desc:", req.body.review_description);
        console.log("response:", req.body.owner_response);


        database.collections['reviews'].updateOne({ reviewer_name: req.body.reviewer_name,
                                                    restaurant: req.body.restaurant,
                                                    review_description: req.body.review_description}, { owner_response: req.body.owner_response });
        documents = database.collections['reviews'].find({ reviewer_name: req.body.reviewer_name,
                                                            restaurant: req.body.restaurant,
                                                            review_description: req.body.review_description})[0];
        console.log('\n\n---------- UPDATE ONE ----------');
        console.log(documents);


    } catch (error) {
        console.error('Error updating owner response:', error);
        res.status(500).send('Internal server error');
    }
});
//////////////////////////////////////
//  restaurantRouter.post('/:restaurant/writeareview', async (req, res) => {
//     let restaurant_route = req.body.restaurant;

//     function validRestaurant(restaurant) {
//         let restaurant_name = restaurant.restaurant_name;
//         return restaurant_name===restaurant_route;
//     }

//     const prev_length = database.collections['reviews'].getLength();

//     let restaurant = database.collections['restaurants'].documents.find(validRestaurant);

//     try {
//         //inserts new entry into the database
//         const review = await database.collections['reviews'].insertOne(req.body);
//         console.log(database.collections['reviews'])

//         //checking if it inserted correctly
//         if (prev_length < database.collections['reviews'].getLength()) {
//             res.sendStatus(200);
//             if (restaurant) {
//                 const update = await database.collections['restaurants'].updateOne({restaurant_name: restaurant.restaurant_name}, {resto_reviews: database.collections['reviews'].find({restaurant: restaurant.restaurant_name})});
                
//             }
//         } else {
//             res.sendStatus(500);
//         }
//     } catch (err) {
//         console.error(err);
//         res.sendStatus(500);
//     }
    
// });
module.exports = adminRouter;
