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

// cart 
router.route('/cart')
    .get(productController.getCart)
    .post(productController.postCart)

router.delete('/cart/:id', productController.deleteCartId)

router.put('/cart/:id', productController.putCart)

// checkout pembayaran
router.post('/cart/payment', productController.payment)

module.exports = router