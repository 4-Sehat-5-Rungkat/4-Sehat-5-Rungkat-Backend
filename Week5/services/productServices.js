const { product } = require("../models")
const { saveImage } = require("../helpers/saveImageHelper")
const { deleteImageHelper } = require("../helpers/deleteImageHelper")

exports.getAllProducts = async (req, res) => {
    
    const data = await product.findAll()

    return {
        status: 200,
        data,
        message: 'Success get all data'
    }
}

exports.createProduct = async (req, res) => {
    const {name,description, price, image} = req.body
    const slug = name.toLowerCase().split(' ').join('-')

    const imageFilePath = await saveImage(req.files.image,slug, "product")

    const data = await product.create({name, description, price, image: imageFilePath})

    return {
        status: 201,
        data: req.body,
        message: "Success Create Data"
    }
}

exports.deleteProducts = async (req,res) => {
    const {id} = req.params
    const data = await product.findOne({where:{id}})

    if (!data) {
        return{
            status: 404,
            message: 'data not found'
        }
    }

    deleteImageHelper(data.image)

    await product.destroy({where:{id}})

    return {
        status: 200,
        message: "success delete product"
    }
}

exports.getProductId = async (req,res) => {
    const { id } = req.params

    const data = await product.findOne({where: {id}})

    if (!data) {
        return {
            status: 404,
            message: "data not found"
        }
    }

    return{
        status: 200,
        data,
        message: 'Success Get Data by id'
    }
}

exports.editProduct = async(req, res) => {
    const {id} = req.params
    const data = product.findOne({where: {id}})

    if (!data){
        return{
            status: 404,
            message: 'Data not Found'
        }
    }

    const {name, description, price} = req.body 
    const slug = name.toLowerCase().split(' ').join('-')
    deleteImageHelper(data.image)

    const imageFilePath = await saveImage(req.files.image,slug, "product")

    await product.update({name, description, price, image: imageFilePath}, {where:{id}})

    return{
        status: 200,
        data: req.body,
        message: 'Success update data'
    }
}