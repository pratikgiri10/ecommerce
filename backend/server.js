import 'dotenv/config'
import connectDb from './config/dbConfig.js';
import { app } from './app.js';




connectDb().then(() => {
    console.log("Mongodb connected: ")
    
    app.listen(process.env.PORT || 3000, () => {
        console.log("Server is listening at port 3000 ...")
    })
}).catch((err) => {
    console.log("error connecting database: ",err)
})




