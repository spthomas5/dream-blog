const mongoose = require('mongoose');

const dreamSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    title: {
        type: String,
        required: [true, "Please add a title!"]
    },
    text: {
        type: String,
        required: [true, "Your post cannot be empty!"]
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Dream', dreamSchema);