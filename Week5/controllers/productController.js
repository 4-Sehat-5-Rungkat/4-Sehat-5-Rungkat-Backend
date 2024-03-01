const productService = require('../services/productServices')

exports.getProducts = async(req, res) => {
    const result = await productService.getProducts(req,res)
    return res.status(result.status).json(result)
}