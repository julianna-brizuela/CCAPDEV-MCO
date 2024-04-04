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

module.exports = {nestedQueryNoProject, nestedQuery,getAverageRating};