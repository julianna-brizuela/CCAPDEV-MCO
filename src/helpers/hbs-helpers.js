module.exports = {
    toLink: function (text) { 
        if (text) {
            text = text.replace(/\s/g, '');
            return text.toLowerCase(); 
        }
    },
    isEqual: function (arg1, arg2) {
        return (arg1 === arg2) ? 1 : 0;
    },
};
