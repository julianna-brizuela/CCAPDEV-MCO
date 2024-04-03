const { Schema, SchemaTypes, model } = require('mongoose');

const restaurantsSchema = new Schema({
    pfp: {
        type: SchemaTypes.String,
        required: true,
    },
    restaurant_name: {
        type: SchemaTypes.String,
        required: true,
    },
    location: {
        type: SchemaTypes.String,
        required: true,
    },
    address: {
        type: SchemaTypes.String,
        required: true,
    },
    phone_number: {
        type: SchemaTypes.String,
        required: true,
    },
    description: {
        type: SchemaTypes.String,
        required: true,
    },
    tags: {
        type: [SchemaTypes.String],
        required: true,
    },
    price: {
        type: SchemaTypes.String,
        required: true,
    },
    menu: {
        type: SchemaTypes.String,
        required: true,
    },
    images: {
        type: [SchemaTypes.String],
        required: true,
    },
    resto_reviews: {
        type: [SchemaTypes.ObjectId],
        ref: 'reviews',
        required: true,
         
        default: undefined,
    },
    rating: {
        type: SchemaTypes.Number,
        required: true,
    },
    review_num: {
        type: SchemaTypes.Number,
        required: true,
    },
    star: {
        type: [SchemaTypes.String],
        required: true,
    },
    map_link: {
        type: SchemaTypes.String,
        required: true,
    },
});

const restaurants = model('restaurants', restaurantsSchema);
 
module.exports = restaurants