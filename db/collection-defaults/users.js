const reviewsCollection = require('./reviews.js');

const documents = [
    {
        _id: '2024-03-14T09:45:23.076Z',
        username: 'Josh_Hutcherson',
        name: 'Josh Hutcherson',
        email: 'josh_hutcherson@gmail.com',
        password: '1234',
        pfp: 'profile-pic-1.jpg',
        reviews: reviewsCollection.find({ reviewer_name: 'Josh Hutcherson' }),
        favorites: ["King Bee"],
    },
    {
        _id: '2024-03-14T09:45:23.104Z',
        username: 'Sensei_Wu_Baby',
        name: 'Sensei Wu Baby',
        email: 'sensei_wu_baby@gmail.com',
        password: '1234',
        pfp: 'profile-pic-2.jpg',
        reviews: reviewsCollection.find({ reviewer_name: 'Sensei Wu Baby' }),
        favorites: [],
    },
    {
        _id: '2024-03-14T09:53:19.089Z',
        username: 'Mewing_Cat',
        name: 'Mewing Cat',
        email: 'mewing_cat@gmail.com',
        password: '1234',
        pfp: 'profile-pic-3.jpg',
        reviews: reviewsCollection.find({ reviewer_name: 'Mewing Cat' }),
        favorites: [],
    },
];

const Collection = require('../collection.js');
const collection = new Collection('users');

for (const document of documents) {
    collection.insertOne(document);
}

module.exports = collection;