const productService = require('../services/productServices')
const {validateAddProduct, validateEditProduct} = require('../validations/productValidations')
const { imageValidations } = require('../validations/imageValidations')

exports.getAllProducts = async(req, res) => {
    const result = await productService.getAllProducts(req,res)
    return res.status(result.status).json(result)
}

exports.createProduct = async (req, res) => {

    let {error} = validateAddProduct(req.body)

    if(error){
        return res.status(400).json({
            message: error.details[0].message
        })
    }

    let imageVal = imageValidations(req)

    if(imageVal.error){
        return res.status(400).json({
            message: imageVal.message
        })
    
    }

    const result = await productService.createProduct(req, res)

    return res.status(result.status).json(result)
}

exports.deleteProduct = async(req, res) => {
    const result = await productService.deleteProducts(req,res)

    return res.status(result.status).json(result)
}

exports.getProductId = async (req, res) => {
    const result = await productService.getProductId(req,res)
    return res.status(result.status).json(result)
}

exports.editProduct = async (req, res) => {
    let { error } = validateEditProduct(req.body)

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }

    let imageVal = imageValidations(req)

    if (imageVal.error){
        return res.status(400).json({
            message: imageVal.message
        })
    }

    const result = await productService.editProduct(req, res)

    return res.status(result.status).json(result)
}