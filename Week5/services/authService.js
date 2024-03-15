const becrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { user } = require('../models');
require('dotenv').config();

exports.authServicesLogin = async (req) => {
    const {email, password} = req.body
    const dataUser = await user.findOne({where: {email}}) 

    if (email != dataUser.email) {
        return {
            status: 403,
            message: 'Email & Password Wrong'
        }
    }

    const checkPassword = await becrypt.compare(password, dataUser.password)

    if (!checkPassword){
        return {
            status: 403, 
            message: 'Email & Password Wrong'
        }
    }

    const token = jwt.sign({
        id: dataUser.id,
        email: dataUser.email,
        name: dataUser.name,
    }, process.env.JWT, {
        expiresIn: '24h'
    })

    return {
        status: 201,
        message: 'Success Login',
        data: {
            token 
        }
    }
}