const authServices = require('../services/authService')

exports.authControllerLogin = async(req, res, next) => {
    const result = await authServices.authServicesLogin(req,res)
    return res.status(result.status).json(result)
}