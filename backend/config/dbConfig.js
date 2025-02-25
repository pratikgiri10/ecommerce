import {MongoClient} from 'mongodb'
import 'dotenv/config'
const client  = new MongoClient(`${process.env.MONGO_URI}`);
export default client
