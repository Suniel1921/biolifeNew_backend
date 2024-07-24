const express = require ('express');
const router = express.Router();
const controller = require ('../controller/reviewController');
const { requireLogin } = require('../middleware/authMiddleware');

router.post('/addReview', requireLogin, controller.addReview);
router.get('/getProductReviews/:productId', controller.getAllProductReviews);






module.exports = router;
