import express from 'express'
import { changeOrderStatus, changePaymentStatus, deleteOrder, getAllOrderDetails, getOrderDetails, postUserOrder } from '../controllers/order/order.controller.js'
import { isAuthenticated } from '../middlewares/authenticated.js'

const router = express.Router()

router.post('/postuserorder', isAuthenticated, postUserOrder)
router.get('/getuserorder', isAuthenticated, getOrderDetails)
router.get('/getallorders', getAllOrderDetails)
router.put('/updateorderstatus', changeOrderStatus)
router.put('/updatepaymentstatus', changePaymentStatus)
router.delete('/deleteorder', deleteOrder)

export default router 