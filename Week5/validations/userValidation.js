const joi = require('joi')

exports.validateAddUser = (user) => {
    const schema = joi.object({
      name: joi.string().min(3).required(),
      password: joi.string().min(8).required(),
      email: joi.string().email().required()
    })
    return schema.validate(user)
  }