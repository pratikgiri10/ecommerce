import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js';
import  client from './config/dbConfig.js'
const app = express();
app.use(express.json())
app.use(cors())
app.use('/api', authRoutes)
const startDb = async () => {
    try{
        

        const con = await client.connect()
        console.log("Mongodb connected: ")
        app.listen(3000, () => {
            console.log("Server is listening at port 3000 ...")
        })
    }catch(err){
        console.log("error connecting database: ",err)
    }
    
}
startDb()
// (async () => {
//     try{
//         console.log("MONGO_URI");

//         await client.connect()
//     }catch(err){
//         console.log("error connecting database: ",err)
//     }
    
// })();

app.get('/' , (_req,res) => {
    res.send("Hello World")
})

