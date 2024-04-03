const { Schema, SchemaTypes, model } = require('mongoose');

const tagsSchema = new Schema({
    tag_name: {
        type: SchemaTypes.String,
        required: true,
    }
});

const tags = model('tags', tagsSchema);

module.exports = tags