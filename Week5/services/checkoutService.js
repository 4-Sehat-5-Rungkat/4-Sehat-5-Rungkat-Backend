const { rupiahFormat } = require('../helpers/formatRupiahHelper')
const { checkout, product, user } = require('../models')

const midtransClient = require('midtrans-client');

let coreApi = new midtransClient.CoreApi({
    isProduction : false,
    serverKey : 'SB-Mid-server-aQc5SN2aJyuzL1_i7Bt6j-ZR',
    clientKey : 'SB-Mid-client-8x_D7MQEVGdSd6F1'
});

exports.createCheckoutProduct = async (req, res) => {

    const {id_product, bank, quantity} = req.body
    const id_user = req.user_data.id
    const products = await product.findOne({where: {id: id_product}})

    if(!products){
        return {
            status: 404,
            message: "Product dengan id tersebut tidak ditemukan"
        }
    }

    const random = Math.floor(Math.random() * 1000000);
    
    const dataMidstrans = {
        "payment_type": "bank_transfer",
        "transaction_details": {
            "order_id": `order-${random}`,
            "gross_amount": quantity * products.price
        },
        "items_details":[
            {
                "id": product.id,
                "price": product.price,
                "quantity": quantity,
                "name": product.name,
                "subtotal": quantity * product.price
            }
        ],
        "bank_transfer":{
            "bank": `${bank}`
        },
        "customer_details": {
            "first_name": req.user_data.name, // edit nanti
            "last_name": req.user_data.name,
            "email": req.user_data.email,
        }
    }

    let transactionToken = await coreApi.charge(dataMidstrans)

    let data = await checkout.create(
        {
            order_id: `order-${random}`,
            id_user,
            id_product,
            quantity,
            status: 'pending',
            va_number: transactionToken.va_numbers[0].va_number,
        }
    )
    
    data.dataValues.total = rupiahFormat(quantity * products.price)

    return {
        status: 201,
        data,
        message: "Success Create Data"
    }

}

exports.notificationService = async (req, res) => {
    try {
        let midtransNotification = await coreApi.transaction.notification(req.body)
        checkout.update(
            {
                status: midtransNotification.transaction_status
            }, 
            {
                where: 
                {
                    order_id: midtransNotification.order_id
                }
            }
        )
        return {
            status: 200,
            message: "Success Update Data"
        }
    } catch (error) {
        console.log(error)
        return {
            status: 500,
            message: "Internal Server Error"
        }
    }
}