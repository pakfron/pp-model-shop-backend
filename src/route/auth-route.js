const express = require('express')
const { registerController, loginController, meController, addAddress, getAddress } = require('../controller/auth-controller')
const authenticateMiddleware = require('../middlewares/authenticate')

const router = express.Router()

router.post('/register',registerController)
router.post('/login',loginController)
router.use(authenticateMiddleware)
router.get('/me',meController)
router.post('/addaddress',addAddress)
router.get('/getaddress',getAddress)

module.exports=router