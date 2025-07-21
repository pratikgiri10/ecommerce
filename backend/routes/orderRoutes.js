import express from 'express'
import { postUserOrder } from '../controllers/order/order.controller.js'

const router = express.Router()

router.post('/postuserorder', postUserOrder)

export default router