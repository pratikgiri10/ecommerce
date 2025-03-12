import {MongoClient} from 'mongodb'
export const client  = new MongoClient(`${process.env.MONGO_URI}`);
const connectDb = async () => {        

        const con = await client.connect()
       
   
    
}
export default connectDb
