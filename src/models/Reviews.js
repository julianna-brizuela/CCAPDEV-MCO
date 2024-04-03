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
        default: formattedDate = function() {
            function formatDate(date) {
                // extracting individual components of the date
                var month = (date.getMonth() + 1).toString.padStart(2, '0'); // adding 1 because getMonth() returns 0-indexed month
                var day = date.getDate().toString.padStart(2, '0');
                var year = date.getFullYear().toString;
              
                // combining components into MM/DD/YYYY format
                return month + '/' + day + '/' + year;
              }

              var today = Date.now();
              var formattedDate = formatDate(today);

              return formattedDate;
        }
    },
    review_description: {
        type: SchemaTypes.String,
        required: true
    },
    owner_response: {
        type: SchemaTypes.String,
        required: false,
    },

});

const reviews = model('reviews', reviewsSchema);

module.exports = reviews;