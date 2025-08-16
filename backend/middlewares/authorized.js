import { ApiError } from "../utils/ApiError.js"

export const isAuthorized = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new ApiError(401, 'Unauthorized request')
        } else {
            next()
        }

    }
}