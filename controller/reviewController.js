// const reviewModel = require('../models/reviewModel');

// exports.addReview = async (req, res) => {
//     try {
//         const { productId, rating, comment } = req.body;
//         const userId = req.user.id;

//         if (!productId || !rating || !comment) {
//             return res.status(400).json({ success: false, message: 'All fields are required' });
//         }

//         const review = await reviewModel.create({ product: productId, user: userId, rating, comment });
//         return res.status(201).json({ success: true, message: 'Review added', review });
//     } catch (error) {
//         return res.status(500).json({ success: false, message: `Internal server error: ${error.message}` });
//     }
// };

// exports.getAllProductReviews = async (req, res) => {
//     try {
//         const { productId } = req.params;

//         const reviews = await reviewModel.find({ product: productId }).populate('user', 'name');
//         if (reviews.length === 0) {
//             return res.status(404).json({ success: false, message: 'No reviews found' });
//         }

//         return res.status(200).json({ success: true, message: 'Reviews found', reviews });
//     } catch (error) {
//         return res.status(500).json({ success: false, message: `Internal server error: ${error.message}` });
//     }
// };








const reviewModel = require('../models/reviewModel');

exports.addReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;
        const userId = req.user._id; // Use req.user._id

        if (!productId || !rating || !comment) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const review = await reviewModel.create({ product: productId, user: userId, rating, comment });
        return res.status(201).json({ success: true, message: 'Review added', review });
    } catch (error) {
        return res.status(500).json({ success: false, message: `Internal server error: ${error.message}` });
    }
};

exports.getAllProductReviews = async (req, res) => {
    try {
        const { productId } = req.params;

        const reviews = await reviewModel.find({ product: productId }).populate('user', 'name');
        if (reviews.length === 0) {
            return res.status(404).json({ success: false, message: 'No reviews found' });
        }

        return res.status(200).json({ success: true, message: 'Reviews found', reviews });
    } catch (error) {
        return res.status(500).json({ success: false, message: `Internal server error: ${error.message}` });
    }
};
