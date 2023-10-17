const express = require('express');

const { createProduct, uploadImageProduct, createUrlImageHardCode, getProduct } = require('../controller/product-controller');
const uploadMiddleware = require('../middlewares/upload')

const router = express.Router();

router.post('/create',createProduct)
router.post('/uploadimage',uploadMiddleware.single("image"),uploadImageProduct)
router.post('/image',createUrlImageHardCode)
router.get("",getProduct)
module.exports = router