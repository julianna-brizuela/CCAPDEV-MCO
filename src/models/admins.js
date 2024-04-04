const { Schema, SchemaTypes, model } = require('mongoose');

const adminsSchema = new Schema({
    username: {
        type: SchemaTypes.String,
        required: true,
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
    owned_restaurant: {
        type: SchemaTypes.ObjectId,
        ref: 'restaurants',
        default: null,
    },
});

const admins = model('admins', adminsSchema);

module.exports = admins;