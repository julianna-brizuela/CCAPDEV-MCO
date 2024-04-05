module.exports = {
    toLink: function (text) { 
        if (text) {
            text = text.toString().replace(/\s/g, '');
            return text.toLowerCase(); 
        }
        
    },
    isEqual: function (arg1, arg2) {
        return (arg1 === arg2) ? 1 : 0;
    },
    json: function (obj) {
        return JSON.stringify(obj)
    },
    gt: function (num1, num2) {
        return num1 > num2;
    },
    object: ({obj}) => {
        return obj;
    },
};
