const cloudinary = require('../config/cloundinary');

exports.upload = async (path) =>{

    const result  = await cloudinary.uploader.upload(path)
    return result.secure_url

}