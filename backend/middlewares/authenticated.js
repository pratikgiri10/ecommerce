import jwt from 'jsonwebtoken'
export const isAuthenticated = (req,res, next) => {
    const token = req.cookies.token;
    if(!token)
        return res.status(401).json({error: "Access Denied"})
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        next()
    }catch(error){
        res.status(403).json({error: "invalid token"})
    }
}