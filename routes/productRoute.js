const express = require ('express');
const router = express.Router();
const controller = require ('../controller/productController');
const { requireLogin, isAdmin } = require('../middleware/authMiddleware');

router.post('/createProduct', controller.createProduct);
router.get('/getAllProduct', controller.getAllProducts);
router.get('/getSingleProduct/:id', controller.getSingleProduct);
router.put('/updateProduct/:id', controller.updateProduct);
router.delete('/deleteProduct/:id', controller.deleteProduct);
router.get('/relatedProducts/:id', controller.getRelatedProducts);



module.exports = router;
