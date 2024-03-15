class Collection {
    constructor(name) {
        this.name = name;
        this.documents = [];
    }

    insertOne(document) {
        this.documents.push(document);
    }
    
    find(query) { // WARNING: This is only a shallow search
        return this.documents.filter(document => {
            // Check if each document matches the query criteria
            for (const key in query) {
                if (document[key] !== query[key]) {
                    return false;
                }
            }
            return true;
        });
    }

    updateOne(query, update) {
        for (const document of this.documents) {
            let matchesQuery = true;
            for (const key in query) {
                if (document[key] !== query[key]) {
                    matchesQuery = false;
                    break;
                }
            }
            if (matchesQuery) {
                Object.assign(document, update);
                return true;
            }
        }
        return false;
    }

    // Update all documents that match the query
    updateMany(query, update) {
        let updated = false;
        for (const document of this.documents) {
            let matchesQuery = true;
            for (const key in query) {
                if (document[key] !== query[key]) {
                    matchesQuery = false;
                    break;
                }
            }
            if (matchesQuery) {
                Object.assign(document, update);
                updated = true;
            }
        }
        return updated;
    }

    deleteOne(query) {
        const filteredDocuments = this.documents.filter(document => {
            for (const key in query) {
                if (document[key] !== query[key])
                    return true; // Keep the document in the array
            }
            return false; // Exclude the document from the array
        });
    
        if (filteredDocuments.length < this.documents.length) {
            this.documents = filteredDocuments;
            return true; // Document deleted successfully
        }
    
        return false; // Document not found
    }

    deleteMany(query) {
        const originalLength = this.documents.length;
        this.documents = this.documents.filter(document => {
            for (const key in query) {
                if (document[key] !== query[key])
                    return true; // Keep the document in the array
            }
            return false; // Exclude the document from the array
        });
        return originalLength !== this.documents.length; // Return true if any document was deleted
    }

    getLength() {
        return this.documents.length;
    }
}

module.exports = Collection;
