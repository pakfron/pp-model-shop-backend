const express = require('express')
const { createOrder, uploadImageSlip, getOrder, getOrderAdmin, chageStatusOrder, getOrderById, getOrderByIdAdmin } = require('../controller/payment-controller')
const authenticateMiddleware = require('../middlewares/authenticate')
const uploadMiddleware = require('../middlewares/upload')
const router = express.Router()

router.post('/order',authenticateMiddleware,createOrder)
router.post('/slip',uploadMiddleware.fields([{
    name:'image',maxCount:1
},{name:"orderId"}]),uploadImageSlip)
router.get('/orderhistory',authenticateMiddleware,getOrder)
router.post('/orderhistory-id',authenticateMiddleware,getOrderById)
router.post('/orderhistory-id-admin',authenticateMiddleware,getOrderByIdAdmin)
router.get('/orderhistory/admin',authenticateMiddleware,getOrderAdmin)
router.patch('/orderhistoryy/admin/order/changestatus',authenticateMiddleware,chageStatusOrder)
module.exports = router