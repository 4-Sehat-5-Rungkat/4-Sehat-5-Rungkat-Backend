var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController')

router.get('/', userController.getAllUser)
router.get('/:id', userController.getUserId)
router.post('/', userController.createUser)

module.exports = router;