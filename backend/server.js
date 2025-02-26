import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js';
import  client from './config/dbConfig.js'
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json())
app.use(cors({
     origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser())

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

