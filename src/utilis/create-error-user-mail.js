exports.createErrorUsernameEmail = (message,statusCode,username,email)=>{
    const error = new Error(message)
    
    error.statusCode=statusCode
    error.username=username
    error.email=email
    return error
    }
    
    
    