var express = require('express');
var router = express.Router();
const {auth} = require('../middleware/indexMiddleware')
const checkoutController = require('../controllers/checkoutController')

router.post('/', auth,checkoutController.checkoutProductController)
router.post('/notification', checkoutController.notificationController)

module.exports = router;