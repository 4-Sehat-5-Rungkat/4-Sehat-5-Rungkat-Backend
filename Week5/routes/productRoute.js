var express = require('express');
var router = express.Router();

const productController = require('../controllers/productController')

router.get('/', productController.getAllProducts)
router.get('/:id', productController.getProductId)
router.post('/', productController.createProduct)
router.delete('/:id', productController.deleteProduct)

module.exports = router;