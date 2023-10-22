const express = require("express");
const prisma = require("../model/prisma");
const { upload } = require("../utilis/cloundinary-service");
const { unlink } = require("../route/auth-route");
const app = express();
const fs = require('fs/promises')

exports.createOrder = async(req,res,next)=>{
    try {
        let orderDemo = {}
        const {user:{id}} = req
        const address = await prisma.address.findMany({
            where:{
                userId:id
            }
        })
        const cartItem = await prisma.cart.findMany({
            where:{
                userId:id
            }
        })
        // console.log(cartItem)
        const totalPrices = cartItem.reduce((acc,item)=>{
          acc += +item.totalPrice  
            return acc
        },0)
        console.log(totalPrices)
        orderDemo = {...orderDemo,totalPrice:totalPrices,addressId:address[0].id,userId:id,OrderStatus:"Pending"}
        const {totalPrice}= orderDemo
        // const createOrder = await prisma.order
        const orders= await prisma.order.create({
            data:{
                totalPrice,
                OrderStatus:orderDemo.OrderStatus,
                userId:id,
                addressId:orderDemo.addressId}
        })
        // console.log(orders)

        const orderItems = cartItem.reduce((acc,item)=>{
            let b = {}
                b['totalPrice']=item.totalPrice
                b['quantity']= item.quantity
                b['productId']=item.productId
                b['orderId']=orders.id
    
                return [...acc,b]
        },[])
        console.log(orderItems)
        const pushOrderItems = await prisma.orderItem.createMany({
            data:orderItems
        })
        console.log(pushOrderItems)

        
        res.status(201).json({orders})
    } catch (error) {
        next(error)
        
    }
}

exports.uploadImageSlip = async (req, res, next) => {
    try {
        const {body:{orderId},files}=req
       
    console.log(orderId)
    const imgUrl = await upload(files.image[0].path);
        console.log(imgUrl)

        
       const checkOrder = await prisma.order.update({
        where:{
            id:+orderId
        },
        data:{slip:imgUrl,
            dateTime:{set:new Date()}
        }
       })

      

      res.status(201).json({checkOrder});
    } catch (error) {
      next(error);
    } finally {
        if(req.files.image[0].path){
            fs.unlink(req.files.image[0].path)
        }
    }
  };

  exports.getOrder = async(req,res,next)=>{
    try {
        const {user:{id}} = req
        const order = await prisma.order.findMany({
            where:{
                userId:id
            }
        })

        res.status(200).json({order})
    } catch (error) {
        next(error)
    }
  }