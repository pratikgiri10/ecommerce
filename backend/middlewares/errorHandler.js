import { ApiError } from "../utils/ApiError.js";

export const errorHandler = async (err, req, res, next) => {
    let {statusCode, message, errors} = err
    if(!(err instanceof ApiError))
    {
        statusCode = 500
        message = 'internal server error'
    }
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errors: errors || null,
    });
    next()
}