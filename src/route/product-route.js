const express = require('express');
const authenticateMiddleware = require('../middlewares/authenticate')
const { createProduct, uploadImageProduct, createUrlImageHardCode, getProduct, delelteProduct,updateProduct } = require('../controller/product-controller');
const uploadMiddleware = require('../middlewares/upload')

const router = express.Router();

router.post('/create',uploadMiddleware.single("image"),createProduct)
router.delete('/delete/:productId',authenticateMiddleware,delelteProduct)
// router.post('/uploadimage',uploadMiddleware.single("image"),uploadImageProduct)
// router.post('/image',createUrlImageHardCode)
router.patch('/updateproduct/:productId',uploadMiddleware.single("image"),updateProduct)
router.get("",getProduct)
module.exports = router