const express = require('express')
const { createOrder, uploadImageSlip, getOrder, getOrderAdmin, chageStatusOrder } = require('../controller/payment-controller')
const authenticateMiddleware = require('../middlewares/authenticate')
const uploadMiddleware = require('../middlewares/upload')
const router = express.Router()

router.post('/order',authenticateMiddleware,createOrder)
router.post('/slip',uploadMiddleware.fields([{
    name:'image',maxCount:1
},{name:"orderId"}]),uploadImageSlip)
router.get('/orderhistory',authenticateMiddleware,getOrder)
router.get('/orderhistory/admin',authenticateMiddleware,getOrderAdmin)
router.patch('/orderhistoryy/admin/order/changestatus',authenticateMiddleware,chageStatusOrder)
module.exports = router