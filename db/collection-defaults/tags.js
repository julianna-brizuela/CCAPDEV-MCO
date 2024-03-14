const documents = [
    {
        'tags': [ "Japanese", "Ramen", "Okonomiyaki", "Fusion Cuisine", "Vegan-Friendly", "Italian", "Filipino", "Asian", "Cantonese", "Chinese", "Cafe" ],
    },
];

const Collection = require('../collection.js');
const collection = new Collection('tags');

for (const document of documents) {
    collection.insertOne(document);
}

module.exports = collection;
