require("dotenv").config();
const express = require("express");
const { registerSchema } = require("../validator/auth-validator");
const prisma = require("../model/prisma");
const { bcrypt } = require("../model/bcrypt");
const { jwt } = require("../model/jwt");
const { createError } = require("../utilis/create-error");
const { createErrorUsername } = require("../utilis/create-error-user");
const {
  createErrorUsernameEmail,
} = require("../utilis/create-error-user-mail");
const { createErrorEmail } = require("../utilis/create-error-email");
// const { createError } = require('../utilis/create-error');
const app = express();

exports.registerController = async (req, res, next) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    const userEmailDup = await prisma.user.findUnique({
      where: {
        username: value.username,
        email: value.email,
      },
    });
    if (userEmailDup) {
      return next(
        createErrorUsernameEmail(
          "Can not Register",
          401,
          "Username already exist",
          "Email already exist"
        )
      );
    }

    const userDup = await prisma.user.findUnique({
      where: {
        username: value.username,
      },
    });

    if (userDup) {
      return next(
        createErrorUsername("Can not Register", 401, "Username already exist")
      );
    }

    const emailDup = await prisma.user.findUnique({
      where: {
        email: value.email,
      },
    });

    if (emailDup) {
      return next(
        createErrorEmail("Can not Register"),
        401,
        "Email already exist"
      );
    }

    value.password = await bcrypt.hash(value.password, 10);
    const user = await prisma.user.create({
      data: value,
    });

    const payload = { userId: user.id };
    const JWT_SECRET_KEY =
      process.env.JWT_SECRET_KEY || "ajsdflhasdifljsDfhasoaifj;fj;ds";
    const JWT_EXPIRE = process.env.JWT_EXPIRE || "7d";
    const accessToken = jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: JWT_EXPIRE,
    });
    delete user.password;
    delete user.role;

    res.status(200).json({ accessToken, user });
  } catch (error) {
    next(error);
  }
};

exports.loginController = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    if (!user) {
      return next(createError("Invalid Username or Password", 401));
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return next(createError("Invalid Username or Password", 401));
    }
    delete user.password;
    delete user.role;

    const payload = { userId: user.id };
    const JWT_SECRET_KEY =
      process.env.JWT_SECRET_KEY || "ajsdflhasdifljsDfhasoaifj;fj;ds";
    const JWT_EXPIRE = process.env.JWT_EXPIRE || "7d";
    const accessToken = jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: JWT_EXPIRE,
    });

    delete user.password;
    delete user.role;

    res.status(201).json({ accessToken, user });
  } catch (error) {
    next(error);
  }
};

exports.meController = (req, res, next) => {
  try {
    
    delete req.user.password;
    delete req.user.role;
    res.status(200).json({ user: req.user });
  } catch (error) {}
};
