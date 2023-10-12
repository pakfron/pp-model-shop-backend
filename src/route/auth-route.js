const express = require('express')
const { registerController, loginController, meController } = require('../controller/auth-controller')
const authenticateMiddleware = require('../middlewares/authenticate')

const router = express.Router()

router.post('/register',registerController)
router.post('/login',loginController)
router.use(authenticateMiddleware)
router.get('/me',meController)
module.exports=router