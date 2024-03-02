const productService = require('../services/productServices')

exports.getAllProducts = async(req, res) => {
    const result = await productService.getAllProducts(req,res)
    return res.status(result.status).json(result)
}