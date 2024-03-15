const documents = [
    {
        _id: '2024-03-14T18:00:45.978Z',
        username: "Jane Doe",
        name: "Jane Doe",
        email: "jane_doe@gmail.com",
        password: "123!",
        restaurant_name: "Botejyu"
    },
    {
        _id: '2024-03-15T10:29:43.717Z',
        username: "Leon Kennedy",
        name: "Leon Kennedy",
        email: "leon_kennedy@gmail.com",
        password: "asdfghjkl",
        restaurant_name: "UCC Clockwork"
    },
    {
        _id: '2024-03-15T10:29:59.682Z',
        username: "Gwen Stacy",
        name: "Gwen Stacy",
        email: "gwen_stacy@gmail.com",
        password: "qwerty1",
        restaurant_name: "The Wholesome Table"
    },
    {
        _id: '2024-03-15T10:30:02.236Z',
        username: "Barry Benson",
        name: "Barry Benson",
        email: "barry_benson@gmail.com",
        password: "21bzzz",
        restaurant_name: "King Bee"
    }
];

const Collection = require('../collection.js');
const collection = new Collection('admins');

for (const document of documents) {
    collection.insertOne(document);
}

module.exports = collection;
