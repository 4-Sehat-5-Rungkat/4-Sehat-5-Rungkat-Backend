const { product } = require("../models")

exports.getAllProducts = async (req, res) => {
    
    const data = await product.findAll()

    return {
        status: 200,
        data,
        message: 'Success get all data'
    }
}