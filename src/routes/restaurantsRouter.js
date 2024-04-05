/**
 * This module handles all the routes related to the restaurants.
 */
const { Router } = require('express');
const restaurantRouter = Router();

//DATABASES
const Users = require("#models/Users.js");
const Admins = require("#models/Admins.js");
const Restaurants = require("#models/Restaurants.js");
const Reviews = require("#models/Reviews.js");
const Tags = require("#models/Tags.js");

const upload = require('#middleware/upload.js')

//REMOVE LATER
const database = require('../../db/database.js');

const {nestedQuery, nestedQueryNoProject, getAverageRating, updateRestaurant, updateUser} = require("#helpers/js-helpers.js");

//GET for Viewing All Restaurants
restaurantRouter.get('/browse', async (req, res) => {
    const restaurants = await Restaurants.find({}).lean().exec();

    //retrieves the tag_name field from the Tags collection
    const tags = await Tags.find({}, {tag_name:1, _id:0}).lean().exec();
    const tags_array = tags.map(tag => tag.tag_name.toString());

   res.render("restaurant-list", {
        title: "MUNCH | Where your cravings are served!",
        tags: tags_array,
        restaurants: restaurants,
        nav_context: {
            isLoggedIn: req.isAuthenticated(),
        },
    });
});

//GET for Viewing Filtered Restaurants
restaurantRouter.get('/browse/category=:category/filter=:filter', async (req, res) => {
   let category = req.params.category;
   let filter = req.params.filter;
   let restaurants = await Restaurants.find({}).lean().exec();

   switch (category) {
    case "price":
        switch(filter) {
            case "low":
                restaurants = await Restaurants.find({price: '₱'}).lean().exec();
                break;
            case "average":
                restaurants = await Restaurants.find({price: '₱₱'}).lean().exec();
                break;
            case "high":
                restaurants = await Restaurants.find({price: '₱₱₱'}).lean().exec();
                break;
            case "extreme":
                restaurants = await Restaurants.find({price: '₱₱₱₱'}).lean().exec();
                break;  
        }
        break;
    case "tags":
        let arr = []

        function findMatchingTags(restaurant) {
            let tempTags = []
            Object.assign(tempTags, restaurant.tags);

            for (let j = 0; j < tempTags.length; j++) {
                tempTags[j] = tempTags[j].replace(/\s/g, '');
                tempTags[j] = tempTags[j].toLowerCase();
            }

            if (tempTags.find(tag => tag === filter)) {
                return restaurant.restaurant_name;
            } else {
                return 0
            }
        }

        //TODO turn this into helper function
        async function push(arr) {
            for (let i = 0; i < restaurants.length; i++) {
                restaurantName = findMatchingTags(restaurants[i]);

                if (restaurantName !== 0) {
                    //pushes the restaurants whose tags match the filter into the array to be displayed
                    const restaurant = await Restaurants.find({restaurant_name: restaurantName}).lean().exec()
                    arr.push(restaurant);
                }
            }
            
            
            return arr.flat(1);
        }
    
        restaurants = await push([]);
        break;
    case "star":
        let star_filter = []
        switch (filter) {
            case "one":
                star_filter = ['star','blank-star','blank-star','blank-star','blank-star'];
                break;
            case "two":
                star_filter = ['star','star','blank-star','blank-star','blank-star'];
                break;
            case "three":
                star_filter = ['star','star','star','blank-star','blank-star'];
                break;
            case "four":
                star_filter = ['star','star','star','star','blank-star'];
                break;
            case "five":
                star_filter = ['star','star','star','star','star'];
                break;
        }

        function findMatchingStars(restaurant) {
            if (JSON.stringify(restaurant.star) == JSON.stringify(star_filter)) {
                console.log(restaurant.restaurant_name)
                return restaurant.restaurant_name
            }
            else {
                return 0
            }
        }

        async function pushIntoArray(arr) {
            for (let i = 0; i < restaurants.length; i++) {
                restaurantName = findMatchingStars(restaurants[i])
                if (restaurantName !== 0) {
                    const restaurant = await Restaurants.find({restaurant_name: restaurantName}).lean().exec()
                    arr.push(restaurant);
                }
            }
            return arr.flat(1);
        }

        restaurants = await pushIntoArray([]);

        break;
   }

    const tags = await Tags.find({}, {tag_name:1, _id:0}).lean().exec();
    const tags_array = tags.map(tag => tag.tag_name.toString());

    res.render("restaurant-list", {
         title: "MUNCH | Where your cravings are served!",
         tags: tags_array,
         restaurants: restaurants,
         nav_context: {
             isLoggedIn: req.isAuthenticated(),
         },
     });
 });

//GET for Viewing a Restaurant
restaurantRouter.get('/:restaurant', async (req, res) => {
    let restaurant_route = req.params.restaurant;

    let restaurant = await Restaurants.findOne({routeparameter: restaurant_route}).lean().populate({
        path: 'resto_reviews',
        populate: {
            path: 'reviewer',
        }
    }).exec();

    console.log(restaurant_route)

    if (restaurant) {
        res.locals.title = "MUNCH | " + restaurant['restaurant_name'];
        res.render("restaurant", {
            restaurant: restaurant,
            nav_context: {
                isLoggedIn: req.isAuthenticated(),
            },
            isLoggedIn:req.isAuthenticated(),
            routeparameter: restaurant_route,
        });
    } else {
        res.status(404).render('404_error_template', {title: "Sorry, page not found"});
    }

});

//GET for Writing a Review
restaurantRouter.get('/:restaurant/writeareview', async (req, res) => {
    let restaurant_route = req.params.restaurant;

    let restaurant = await Restaurants.findOne({routeparameter: restaurant_route}).lean().populate({
        path: 'resto_reviews',
        populate: {
            path: 'reviewer',
        }
    }).exec();

    if(restaurant) {
        res.locals.title = "MUNCH | Write a Review for " + restaurant['restaurant_name'];
        res.render("writeareview", {
            restaurant: restaurant, 
            nav_context: {
                isLoggedIn: req.isAuthenticated(),
            },
        });
    } else {
        res.status(404).render('404_error_template', {title: "Sorry, page not found"});
    }

    
});

restaurantRouter.post('/:restaurant/writeareview', upload.single("image"), async (req, res) => { 

    let prev_length = await Reviews.find({}).lean().exec();
    prev_length = prev_length.length
    console.log("PREV" + prev_length)

    let restaurant = await Restaurants.findOne({restaurant_name: req.body.restaurant}).lean().exec();
   
    try {
        restaurant = restaurant._id
        const review_description = req.body.review_description;
        const reviewer = req.user._id
        const review_rating = req.body.review_rating
        const date_of_review = req.body.date_of_review
        const owner_response = req.body.owner_response
        let image;

        console.log(req.file)

        if (req.file) {
            image = req.file.path
        }
        
        console.log("IMAGE:" + image)

        try {
            let createReview

            if (image) {
                createReview = await Reviews.create({
                    restaurant: restaurant,
                    reviewer: reviewer,
                    review_rating: review_rating,
                    date_of_review: date_of_review,
                    review_description: review_description,
                    owner_response: owner_response,
                    image: image
                });
            } else {
                createReview = await Reviews.create({
                    restaurant: restaurant,
                    reviewer: reviewer,
                    review_rating: review_rating,
                    date_of_review: date_of_review,
                    review_description: review_description,
                    owner_response: owner_response,
                });
            }
            
        } catch (err) {
            console.log("this did not work!")
            console.log(err)
        }

        let new_length = await Reviews.find({}).lean().exec()
        new_length = new_length.length
        //checks if the reviews have been updated successfully
        if (prev_length < new_length) {
            res.sendStatus(200);

            restaurant = await Restaurants.findOne({restaurant_name: req.body.restaurant}).lean().exec();
            
            if (restaurant) {

                const users = await Users.findOneAndUpdate({username: req.user.username}, {
                    $set: {
                        reviews: []
                    }
                }).exec();

                const restaurants = await Restaurants.findOneAndUpdate({restaurant_name: req.body.restaurant}, {
                    $set: {
                        resto_reviews: []
                    }
                }).exec();
                
                await updateRestaurant(req.body.restaurant, Reviews, Restaurants)
                await updateUser(req.user.username, Reviews, Users)
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
