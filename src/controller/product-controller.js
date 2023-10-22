const express = require("express");
const prisma = require("../model/prisma");
const { upload } = require("../utilis/cloundinary-service");
const app = express();

exports.createProduct = async (req, res, next) => {
  try {
    const { name, series, detail, price, stock, Type } = req.body;

    const result = await prisma.product.create({
      data: { name, series, detail, price, stock, Type },
    });
    console.log(result);
    res.status(201).json({ message: "create complete" });
  } catch (error) {
    next(error);
  }
};

exports.uploadImageProduct = async (req, res, next) => {
  try {
    const imgUrl = await upload(req.file.path);
    console.log(imgUrl);
    res.status(201).json({ message: "test upload image" });
  } catch (error) {
    next(error);
  }
};
//ใช้ลงดาต้าเบสชั่วคราว
exports.createUrlImageHardCode = async (req, res, next) => {
  try {
    const { name, series, imageUrl } = req.body;

    const productId = await prisma.product.findFirst({
      where: {
        name,
        series,
      },
      select: {
        id: true,
      },
    });

    const img = await prisma.imageProduct.create({
      data: {
        productId: productId.id,
        imageUrl,
      },
    });

    res.status(201).json({ img });
  } catch (error) {
    next(error);
  }
};

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
     console.log(products)
    res.status(200).json({ products });
  } catch (error) {
    console.log(error)
    next(error);
  }
};
