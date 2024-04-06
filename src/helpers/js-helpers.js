function getAverageRating(restaurant_reviews, num_reviews) {
    average = 0

    for (let i = 0; i < num_reviews; i++) {
        average = average + restaurant_reviews[i].review_rating;
    }
    return (average/num_reviews).toPrecision(3)
}

//solution from: https://stackoverflow.com/questions/19380738/mongoose-nested-query-on-model-by-field-of-its-referenced-model
async function nestedQuery(Model, nestedModelString, modelString, foreignField, path, match, project) {
    const aggregatedData = await Model.aggregate([
        {$lookup: {
            from: nestedModelString, //the child model name
            localField: modelString, //the parent model name
            foreignField: foreignField, 
            as: modelString}
        },
        {$unwind: {path: path}},
        {$match: match}, //the find query
        {$project: project} //the fields you want to include or exclude
    ]);

    return aggregatedData;
}

async function nestedQueryNoProject(Model, nestedModelString, modelString, foreignField, path, match) {
    const aggregatedData = await Model.aggregate([
        {$lookup: {
            from: nestedModelString, //the child model name
            localField: modelString, //the parent model name
            foreignField: foreignField, 
            as: modelString}
        },
        {$unwind: {path: path}},
        {$match: match}, //the find query
    ]);

    return aggregatedData;
}

async function updateRestaurant(restaurant, Modell, Model2) {
    const Restaurant_Review = await nestedQueryNoProject(Modell, 'restaurants', 'restaurant', '_id', '$reviewer', {'restaurant.restaurant_name': restaurant});
    const Restaurant_ReviewString = Restaurant_Review.map(review => review._id.toString());

    const Restaurant_ReviewNum = Restaurant_ReviewString.length
    const Restaurant_Rating = getAverageRating(Restaurant_Review, Restaurant_ReviewNum)

    const Restaurant_Stars = (function() {
         //taken from: https://stackoverflow.com/questions/6137986/javascript-roundoff-number-to-nearest-0-5
        function round(value, step) {
            step || (step = 1.0);
            var inv = 1.0 / step;
            return Math.round(value * inv) / inv;
        }

        average = round(Restaurant_Rating, 0.5);
        console.log(average)

        switch (average) {
            case 0:
                return ['blank-star','blank-star','blank-star','blank-star','blank-star']
            case 0.5:
                return ['half-star','blank-star','blank-star','blank-star','blank-star']
            case 1:
                return ['star','blank-star','blank-star','blank-star','blank-star']
            case 1.5:
                return ['star','half-star','blank-star','blank-star','blank-star']
            case 2:
                return ['star','star','blank-star','blank-star','blank-star']
            case 2.5:
                return ['star','star','half-star','blank-star','blank-star']
            case 3:
                return ['star','star','star','blank-star','blank-star']
            case 3.5:
                return ['star','star','star','half-star','blank-star']
            case 4:
                return ['star','star','star','star','blank-star']
            case 4.5:
                return ['star','star','star','star','half-star']
            case 5:
                return ['star','star','star','star','star']

        }
    })();

    const updatedRestaurant = await Model2.findOneAndUpdate({restaurant_name: restaurant}, 
    { 
     "$push": { "resto_reviews": Restaurant_ReviewString},
     rating: Restaurant_Rating,
     review_num: Restaurant_ReviewNum,
     "$set": {"star": Restaurant_Stars}
    }
    , {new: true, "upsert": true}).exec();

    console.log("UPDATED RESTAURANT:")
    console.log(updatedRestaurant)
}

async function updateUser(username, Model1, Model2) {
    const User_Review = await nestedQuery(Model1, 'users', 'reviewer', '_id', '$reviewer', {'reviewer.username': username}, {"_id": "$_id"});
    const User_ReviewString = User_Review.map(review => review._id.toString());

    const updatedUser = await Model2.findOneAndUpdate({username: username}, 
    { "$push": { "reviews": User_ReviewString } }
    , {new: true, "upsert": true}).exec();

    console.log(updatedUser)

}


module.exports = {nestedQueryNoProject, nestedQuery,getAverageRating, updateRestaurant, updateUser};