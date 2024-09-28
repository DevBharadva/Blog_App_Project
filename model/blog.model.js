const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
}
);

module.exports = mongoose.model("blogs", blogSchema);