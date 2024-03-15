const { rupiahFormat } = require('../helpers/formatRupiahHelper')
const { checkout, product, user } = require('../models')

exports.createCheckoutProduct = async (req, res) => {

    const {id_product, id_user, quantity} = req.body

    const products = await product.findOne({where: {id: id_product}})

    if(!products){
        return {
            status: 404,
            message: "Product yang ingin kamu beli tidak ditemukan"
        }
    }

    let data = await checkout.create({id_user, id_product, quantity})
    
    data.dataValues.total = rupiahFormat(quantity * products.price)

    return {
        status: 201,
        data,
        message: "Success Create Data"
    }

}