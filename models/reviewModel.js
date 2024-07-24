const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserAuth',
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0.5, 
        max: 5,
    },
    comment: {
        type: String,
        required: true
    }
}, { timestamps: true });

const reviewModel = mongoose.model('Review', reviewSchema);
module.exports = reviewModel;

