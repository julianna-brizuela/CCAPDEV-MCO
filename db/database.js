const Collection = require('./collection.js');

class Database {
    constructor(name) {
        this.name = name
        this.collections = { };
    }

    createCollection(object) {
        if (typeof object === 'string') {
            const name = object;
            this.collections[name] = new Collection(name);
            return true;
        }
        else if (object instanceof Collection) {
            const collection = object;
            this.collections[collection.name] = collection;
            return true;
        }

        return false;
    }

    // Set up default values
    populate() {
        const fs = require('fs');
        const path = require('path');    
        const collectionsList = fs.readdirSync('./db/collection-defaults/');
        // console.log(collectionsList)
    
        for (const filename of collectionsList) {
            const collection = require(path.join(__dirname, './collection-defaults/', filename));
            this.createCollection(collection);
        }

        return this;
    }
}

module.exports = new Database('myDatabase').populate();
