const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controllers');

router.post('/add-product',productController.create);
router.get('/getall-product',productController.getAll);
router.get('/getbyid-product/:id',productController.getById);
router.put('/update-product/:id',productController.updateById);
router.delete('/delete-product/:id',productController.deleteById);
module.exports=router;