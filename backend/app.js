import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(cors({
     origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json({limit: '16kb'}))
app.use(express.urlencoded({extended: true, limit: '16kb'}))
app.use(express.static('public'))
app.use(cookieParser()) 

app.use('/api/v1/users', authRoutes)
app.use('/api/v1/product', productRoutes)

app.use(errorHandler)
export {app}