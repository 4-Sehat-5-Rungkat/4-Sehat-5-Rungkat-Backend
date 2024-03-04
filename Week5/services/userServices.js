const {user} = require('../models')

exports.getAllUser = async (req, res) => {
    const data = await user.findAll()
    return {
        status: 200,
        data,
        message: 'success get all users'
    }
}

exports.getUserId = async (req,res) => {
    const {id} = req.params
    const data = await user.findOne({where: {id}})

    if (!data) {
        return {
            status: 404,
            message: 'Data not found'
        }
    }

    return{
        status: 200, 
        data,
        message: 'success user by id'
    }
}

exports.createUser = async (req, res) => {
    const { name, password, email } = req.body
    const data = await user.create({name, password, email})

    return {
        status: 200,
        data: req.body,
        message: 'success create new user'
    }
}