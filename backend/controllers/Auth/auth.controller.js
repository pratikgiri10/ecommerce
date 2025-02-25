import client from '../../config/dbConfig.js'
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
            response.password == password ? res.status(200).json({response}): res.status(404).json({success: false, error: "email doesn't exist"})
        }
        console.log(response)
    }catch(err){
        console.log(err)
        res.status(400).json({success: false})
    }
}