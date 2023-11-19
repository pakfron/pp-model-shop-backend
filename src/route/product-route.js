const express = require('express');
const authenticateMiddleware = require('../middlewares/authenticate')
const { createProduct, uploadImageProduct, createUrlImageHardCode, getProduct, delelteProduct,updateProduct, getProductEdit, removeProduct } = require('../controller/product-controller');
const uploadMiddleware = require('../middlewares/upload')

const router = express.Router();

router.post('/create',authenticateMiddleware,uploadMiddleware.single("image"),createProduct)
router.post('/delete/:productId',authenticateMiddleware,delelteProduct)
// router.post('/uploadimage',uploadMiddleware.single("image"),uploadImageProduct)
// router.post('/image',createUrlImageHardCode)
router.post('/removeproduct',authenticateMiddleware,removeProduct)
router.post('/updateproduct',authenticateMiddleware,uploadMiddleware.single("image"),updateProduct)
router.post('/getproductedit',authenticateMiddleware,getProductEdit)
router.get("",getProduct)
module.exports = router