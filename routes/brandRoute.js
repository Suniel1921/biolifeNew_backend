const express = require ('express');
const router = express.Router();
const controller = require ('../controller/brandController')


router.post('/createBrand', controller.createBrand);
router.get('/getAllBrand', controller.getAllBrand);
router.delete('/deleteBrand/:id', controller.deleteBrand);
router.put('/updateBrand/:id', controller.updateBrand);



module.exports = router;
