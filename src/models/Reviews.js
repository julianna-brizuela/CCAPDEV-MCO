const { Schema, SchemaTypes, model } = require('mongoose');

const reviewsSchema = new Schema({
    restaurant: {
        type: SchemaTypes.ObjectId,
        ref: 'restaurants',
        required: true,
         
    },
    reviewer: {
        type: SchemaTypes.ObjectId,
        ref: 'users',
        required: true,
         
    },
    review_rating: {
        type: SchemaTypes.Number,
        required: true
    },
    date_of_review: {
        type: SchemaTypes.String,
        required: true,
    },
    review_description: {
        type: SchemaTypes.String,
        required: true
    },
    owner_response: {
        type: SchemaTypes.String,
        required: false,
    },
    image: {
        type: SchemaTypes.String,
        required: false,
    }

});

const reviews = model('reviews', reviewsSchema);

module.exports = reviews;