const mongoose = require('mongoose');

const userSchema  = mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
},{
    versionKey: false
});


module.exports = mongoose.model("users", userSchema);