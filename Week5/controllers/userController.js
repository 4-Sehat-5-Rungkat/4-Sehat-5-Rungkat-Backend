const userService = require('../services/userServices')
const {validateAddUser} = require('../validations/userValidation')

exports.getAllUser = async (req,res) => {
    const result = await userService.getAllUser(req, res)
    return res.status(result.status).json(result)
}

exports.getUserId = async (req,res) => {
    const result = await userService.getUserId(req,res)
    return res.status(result.status).json(result)
}

exports.createUser = async (req,res) => {
    const {error} = validateAddUser(req.body)
    
    if(error){
        return res.status(400).json({
            message: error.details[0].message
        })
    }

    const result = await userService.createUser(req, res)
    return res.status(result.status).json(result)
}