exports.createErrorEmail = (message,statusCode,email)=>{
    const error = new Error(message)
    
    error.statusCode=statusCode
    error.email=email
    return error
    }
    
    
    