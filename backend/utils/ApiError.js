//this is the class that extends the Error class available in the nodejs
//it is used to catch is the error that is thrown from the controller or somewhere 
class ApiError extends Error {
    constructor(
        statusCode,
        message= 'something went wrong',
        errors = [],
        stack = ''
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

export {ApiError}