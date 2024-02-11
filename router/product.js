const express = require('express')
const router = express.Router()
const productController = require('../controller/product.js')

router.route('/product')
    .get(productController.get)
    .post(productController.post)

// get detail product by id
router.get('/product/:id', productController.getId)

// edit product
router.put('/product/:id', productController.editId)

// delete product
router.delete('/product/:id', productController.deleteId)

module.exports = router