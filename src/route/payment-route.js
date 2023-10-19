const express = require('express')
const { createOrder } = require('../controller/payment-controller')
const authenticateMiddleware = require('../middlewares/authenticate')
const router = express.Router()

router.post('/order',authenticateMiddleware,createOrder)

module.exports = router