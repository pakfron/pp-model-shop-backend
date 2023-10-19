require("dotenv").config();
const express = require("express");
const prisma = require("../model/prisma");
const { join } = require("@prisma/client/runtime/library");
const app = express();

exports.addCart = async (req, res, next) => {
  try {
    const {id} = req.user

    const { quantity, productId } = req.body;

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
        }
    })
       return res.status(200).json({checkCart})
    }
    if (!checkUser) {
      return res.status(401).json({ msg: "who are you" });
    }

    const product = await prisma.product.findFirst({
      where: {
        id: productId,
      },
      select: {
        id: true,
        price: true,
      },
    });

    const sumPrice = product.price * quantity || 1 * product.price;

    const pushCart = await prisma.cart.create({
      data: {
        userId:id,
        productId,
        quantity,
        totalPrice: sumPrice,
      },
    });

    res.status(200).json({ pushCart });
  } catch (error) {
    next(error);
  }
};

exports.getCart = async (req, res, next) => {
  try {

    const {id} = req.user
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