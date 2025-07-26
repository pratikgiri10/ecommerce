import express from 'express'
import { changeStatus, deleteOrder, getAllOrderDetails, getOrderDetails, postUserOrder } from '../controllers/order/order.controller.js'
import { isAuthenticated } from '../middlewares/authenticated.js'

const router = express.Router()

router.post('/postuserorder', isAuthenticated, postUserOrder)
router.get('/getuserorder', isAuthenticated, getOrderDetails)
router.get('/getallorders', getAllOrderDetails)
router.put('/updatestatus/:id', changeStatus)
router.delete('/deleteorder/:id', deleteOrder)

export default router 