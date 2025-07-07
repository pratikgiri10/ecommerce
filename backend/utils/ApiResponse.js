
//this is the class used to handle the api response that is sent to the client 
//used when request is ok
class ApiResponse {
    constructor(
        statusCode, data, message = "success"
    ){
        const success = statusCode < 400
        return {
            statusCode,
            data,
            message,
            success,
           
        }
        // this.statusCode = statusCode
        // this.data = data
        // this.message = message
        // this.success = statusCode < 400

    }
}
export {ApiResponse}