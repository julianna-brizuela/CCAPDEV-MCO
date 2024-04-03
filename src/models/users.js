const { Schema, SchemaTypes, model } = require('mongoose');

const usersSchema = new Schema({
    username: {
        type: SchemaTypes.String,
        required: true,
        unique: true,
    },
    name: {
        type: SchemaTypes.String,
        required: true,
    },
    email: {
        type: SchemaTypes.String,
        required: true,
        lowercase: true,
    },
    password: {
        type: SchemaTypes.String,
        required: true,
    },
    pfp: {
        type: SchemaTypes.String,
        required: true,
    },
    reviews: {
        type: [SchemaTypes.ObjectId],
        ref: 'reviews',
        required: true,
         
        default: undefined,
    },
    favorites: {
        type: [SchemaTypes.ObjectId],
        ref: 'restaurants',
        required: true,
         
        default: undefined,
    },
});

const users = model('users', usersSchema);

module.exports = users;