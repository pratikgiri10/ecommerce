import client from '../../config/dbConfig.js'
import jwt from 'jsonwebtoken'
const db = client.db('ecommerce');

export const register =  async (req, res) => {
    console.log("register")
    const {name, email, password} =  req.body;
    console.log(name)
    console.log(email)
    console.log(password)
    // console.table(name, email, password)
    if(!name || !email || !password)
        return res.status(400).json({error: "please fill all the fields"})
    try{
        const response = await db.collection('users').insertOne({
            name,
            email,
            password
        })
        res.status(200).json({success: true})
    }catch(err){
        console.log("error inserting: ". err)
        res.status(400).json({success: false})
    }
}

export const login = async (req, res) => {
    const {username: email, password} = req.body
        console.log(email)
    if(!email || !password)
        return res.status(400).json({error: "please fill all the fields"}) 
    try{
        const response = await db.collection('users').findOne({email})
        if(response){
            const token = jwt.sign({
                    id: response._id,
                    email
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '2h'
                }
            )
            const options = {
                httpOnly: true,
                sameSite: 'lax'
            }
            response.password == password ? res.cookie("token", token, options).json({response, success: true}) : res.status(404).json({success: false, error: "email doesn't exist"})
           
        }
       
    }catch(err){
        console.log(err)
        res.status(400).json({success: false})
    }
}

export const auth = (req,res) => {
    const token = req.cookies.token;
    // console.log(token)
    if(!token)
        return res.status(401).json({error: "Access Denied"})
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        res.json({success: true, user: decoded})
    }catch(error){
        res.status(403).json({error: "invalid token"})
    }
}