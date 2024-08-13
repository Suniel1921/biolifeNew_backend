const express = require ('express');
const router = express.Router();
const controller = require ('../controller/productController');
const { requireLogin, isAdmin } = require('../middleware/authMiddleware');

router.post('/createProduct', controller.createProduct);
router.get('/getAllProduct', controller.getAllProducts);
router.get('/getSingleProduct/:slug', controller.getSingleProduct);
// router.get('/getSingleProduct/:id', controller.getSingleProduct);
router.put('/updateProduct/:id', controller.updateProduct);
router.delete('/deleteProduct/:id', controller.deleteProduct);
router.get('/relatedProducts/:id', controller.getRelatedProducts);
router.get('/getProductsByCategory/:categoryId', controller.getProductsByCategory);



module.exports = router;
