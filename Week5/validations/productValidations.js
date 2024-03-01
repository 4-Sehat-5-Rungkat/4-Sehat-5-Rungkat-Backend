const joi = require('joi')

const validateProduct = (product) => {
    const schema = joi.object({
      name: joi.string().min(3).required(),
      description: joi.string().min(3).required(),
      price: joi.number().required(),
      quantity: joi.number().required(),
    })
    return schema.validate(product)
}
