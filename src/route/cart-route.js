const express= require('express')
const { addCart, getCart,delCart, deleteAllCart, deleteCartByProduct } = require("../controller/cart-controller");
const authenticateMiddleware = require('../middlewares/authenticate')
const router = express.Router();

router.post("/addcart",authenticateMiddleware, addCart);
router.get("/getcart",authenticateMiddleware,getCart)
router.delete("/delcart/:productId",authenticateMiddleware,delCart)
router.delete("/deleteallcart",authenticateMiddleware,deleteAllCart)
router.post('/delete-amount-product',authenticateMiddleware,deleteCartByProduct)
module.exports = router