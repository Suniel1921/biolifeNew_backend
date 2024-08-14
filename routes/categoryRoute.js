const express = require ('express');
const router = express.Router();
const controller = require ('../controller/categoryController');

router.post('/createCategory', controller.createCategory);
// router.post('/createCategory', controller.createCategory);
router.get('/getAllCategory', controller.getAllCategory);
router.delete('/deleteCategory/:id', controller.deleteCategory);
router.put('/updateCategory/:id', controller.updateCategory);



module.exports = router;
