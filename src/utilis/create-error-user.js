exports.createErrorUsername = (message,statusCode,username)=>{
    const error = new Error(message)
    
    error.statusCode=statusCode
    error.username=username
    return error
    }
    
    
    