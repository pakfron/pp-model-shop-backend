require("dotenv").config();
const express = require("express");
const prisma = require("../model/prisma");
const { join } = require("@prisma/client/runtime/library");
const app = express();

exports.addCart = async (req, res, next) => {
  try {
    const {id} = req.user
   
    const { quantity, productId } = req.body;
    console.log(quantity,productId)

    const checkUser = await prisma.user.findUnique({
      where: {
        id
      },
    });

    const checkCart = await prisma.cart.findFirst({
        where:{
            userId:id,
            productId
        }
    })

    if(checkCart){
        const product = await prisma.product.findUnique({
            where:{
                id:productId
            }
        })
            const addQuantity = quantity+checkCart.quantity
            const sumPrice = product.price * addQuantity

    const pushCart = await prisma.cart.update({
        data:{
            quantity:addQuantity,
            totalPrice:sumPrice
        },
        where:{
            id:checkCart.id
        },
        include:{
          product:true
        }
    })
       return res.status(201).json({checkCart,pushCart})
    }
    

    const product = await prisma.product.findFirst({
      where: {
        id: productId,
      },
    });

    const sumPrice = product.price * quantity || 1 * product.price;

    const pushCart = await prisma.cart.create({
      data: {
        userId:id,
        productId,
        quantity,
        totalPrice: sumPrice,
      }
    });

    res.status(201).json({ pushCart,product });
  } catch (error) {
    console.log(error)
    next(error);
  }
};


exports.getCart = async (req, res, next) => {
  try {

    const {id} = req.user

    const deleteCartProductOff = await prisma.cart.deleteMany({
      where:({
        product:{
          status:false
        }
      })
    })

    const checkCart = await prisma.cart.findMany({
      where: {
        userId: id,
      },
      include: {
        product: {
          include: {
            imageproduct: true,
          },
        },
      },
    });
    
    res.status(200).json({ checkCart });
  } catch (error) {
    next(error);
  }
};

exports.delCart = async (req,res,next)=>{
    try {
        const {user:{id},params:{productId}} =req

        console.log(productId)
        const userId=id
        const delCart = await prisma.cart.deleteMany({
            where:{
                userId,
                productId:+productId
            }
        })
        console.log(delCart)
        const checkCart = await prisma.cart.findMany({
            where: {
              userId: id,
            },
            include: {
              product: {
                include: {
                  imageproduct: true,
                },
              },
            },
          });
        res.status(200).json({checkCart})
    } catch (error) {
        console.log(error)
        next(error)
    }
}

exports.deleteAllCart = async (req,res,next) =>{
try {
  const {id}= req.user
    await prisma.cart.deleteMany({
      where:{
        userId:id

      }
    })

   res.status(200).json({msg:"Delete All Cart Complete"})
} catch (error) {
  next(error)
}

}

exports.deleteCartByProduct = async(req,res,next)=>{
  try {
    
    const {user,body:{id,productId,price}}=req

    const cartItem = await prisma.cart.findUnique({
      where:{
        id
      }
    })
    if(cartItem.quantity===1){
      const deleteCart = await prisma.cart.deleteMany({
        where:{
          id
        }
      })
      return res.status(200).json({deleteCart})
    }
    if(cartItem.quantity!==1){
      console.log(cartItem.totalPrice)
      const totalPrice = Number(cartItem.totalPrice) - price
      const quantity = cartItem.quantity - 1


      const newCart = await prisma.cart.updateMany({
        data:{
          totalPrice,
          quantity
        }
        ,where:{
          id
        }
      })

      return res.status(200).json({msg:"decrease Product"})
    }



    res.status(200).json({cartItem})
  } catch (error) {
    console.log(error)
    next(error)
  }
}