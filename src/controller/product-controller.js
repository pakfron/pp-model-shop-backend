const express = require("express");
const prisma = require("../model/prisma");
const { upload } = require("../utilis/cloundinary-service");
const app = express();

exports.createProduct = async (req, res, next) => {
  try {
    const { body:{name, series, detail, price,Type },file:{path}} = req;
    
    // console.log(req.file)
    const product = await prisma.product.create({
      data: { name, series, detail, price, stock:99, Type },
    });

    const imageUrl = await upload(path);
  // console.log(imageUrl)    
    const img = await prisma.imageProduct.create({
      data: {
        productId: product.id,
        imageUrl,
      },
    });



    res.status(201).json({ message: "create complete" });
  } catch (error) {
    console.log(error)
    next(error);
  }
};

// exports.uploadImageProduct = async (req, res, next) => {
//   try {
//     const imgUrl = await upload(req.file.path);
//     console.log(imgUrl);
//     res.status(201).json({ message: "test upload image" });
//   } catch (error) {
//     next(error);
//   }
// };
// //ใช้ลงดาต้าเบสชั่วคราว
// exports.createUrlImageHardCode = async (req, res, next) => {
//   try {
//     const { name, series, imageUrl } = req.body;

//     const productId = await prisma.product.findFirst({
//       where: {
//         name,
//         series,
//       },
//       select: {
//         id: true,
//       },
//     });

//     const img = await prisma.imageProduct.create({
//       data: {
//         productId: productId.id,
//         imageUrl,
//       },
//     });

//     res.status(201).json({ img });
//   } catch (error) {
//     next(error);
//   }
// };

exports.getProduct = async (req, res, next) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        imageproduct:{
          select:{
            id:true,
            imageUrl:true
          }
        }
      }
    });
    //  console.log(products)
    res.status(200).json({ products });
  } catch (error) {
    console.log(error)
    next(error);
  }
};

exports.delelteProduct= async(req,res,next)=>{
  try {
    const {user:{id},params:{productId}}= req
    console.log(productId,id)

    const user = await prisma.user.findUnique({
      where:{
        id:id
      }
    })
    if(user.role!=="admin"){
     return res.status(403).json({msg:"Don't Have Permission"})
    }

    const product = await prisma.product.findMany({
      where:{
        id:+productId
      }
    })

    if(product[0].status===true){
      const chageStatusFalse  = await prisma.product.updateMany({
        data:{status:false}
        ,
        where:{
          id:+productId
        }

      })
      return res.status(200).json({chageStatusFalse})
    }
    if(product[0].status===false){
      const chageStatusTrue  = await prisma.product.updateMany({
        data:{status:true}
        ,
        where:{
          id:+productId
        }

      })
      return res.status(200).json({chageStatusTrue})
    }
  //   const deleteImg = await prisma.imageProduct.deleteMany({
  //     where:{
  //       productId:+productId
  //     }
  //   })

  // const deleteProduct= await prisma.product.deleteMany({
  //   where:{
  //     id:+productId
  //   }
  // })

    res.status(200).json({product})
  } catch (error) {
    next(error)
  }
}

exports.updateProduct = async (req,res,next)=>{
  try {
    const { body:{name, series, detail, price,Type },file:{path},params:{productId}} = req;
    
    // console.log(req.file)
  //   const product = await prisma.product.updateMany({
  //     data: { name, series, detail, price, stock:99, Type },
  //     where:{
  //       id:+productId
  //     }
  //   });

  //   console.log(product)
  //   const imageUrl = await upload(path);
  // // console.log(imageUrl)    
  //   const img = await prisma.imageProduct.updateMany({
  //     data: {
       
  //       imageUrl
  //     },
  //     where:{
  //       productId:product.id
  //     }
  //   });
    

    res.status(200).json({msg:"patch complete"})
  } catch (error) {
    console.log(error)
    next(error)
  }
}
exports.getProductEdit = async (req,res,next)=>{
  try {
    const {body:{productId}}=req
    const productEdit = await prisma.product.findMany({
      where:{id:productId}
      ,include:{imageproduct:true}
    })
    res.status(200).json({productEdit})
  } catch (error) {
    next(error)
  }
}
