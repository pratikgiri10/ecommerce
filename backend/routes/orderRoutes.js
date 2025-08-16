import express from 'express'
import { changeStatus, deleteOrder, getAllOrderDetails, getOrderDetails, postUserOrder } from '../controllers/order/order.controller.js'
import { isAuthenticated } from '../middlewares/authenticated.js'
import { isAuthorized } from '../middlewares/authorized.js'

const router = express.Router()

router.post('/postuserorder', isAuthenticated, isAuthorized('admin'), postUserOrder)
router.get('/getuserorder', isAuthenticated, getOrderDetails)
router.get('/getallorders', isAuthenticated, isAuthorized('admin'), getAllOrderDetails)
router.patch('/updatestatus/:id', isAuthenticated, isAuthorized('admin'), changeStatus)
router.delete('/deleteorder/:id', isAuthenticated, isAuthorized('admin'), deleteOrder)

export default router 