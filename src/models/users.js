const { Schema, SchemaTypes, model } = require('mongoose');

const usersSchema = new Schema({
    username: {
        type: SchemaTypes.String,
        required: true,
        unique: true,
    },
    fullname: {
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
        default: null,
    },
    reviews: {
        type: [SchemaTypes.ObjectId],
        ref: 'reviews',
        default: null,
    },
    favorites: {
        type: [SchemaTypes.ObjectId],
        ref: 'restaurants',
        default: null,
    },
});

const users = model('users', usersSchema);

module.exports = users;