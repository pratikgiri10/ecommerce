import express from 'express'
import { getOrderDetails, postUserOrder } from '../controllers/order/order.controller.js'
import { isAuthenticated } from '../middlewares/authenticated.js'

const router = express.Router()

router.post('/postuserorder', isAuthenticated, postUserOrder)
router.get('/getuserorder', isAuthenticated, getOrderDetails)

export default router