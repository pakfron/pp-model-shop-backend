module.exports = (error, req, res, next) => {
  // if (error.name==="ValidationError"){
  //     error.statusCode =400
  // }

  // console.log(error.message)
  // console.log(error)
  console.log(error);
  res
    .status(error.statusCode || 500)
    .json({
      message: error.message,
      username: error?.username,
      email: error?.email,
      password: error?.password,
    });
  // res.status(error.statusCode||500).json({message:error.message})
};