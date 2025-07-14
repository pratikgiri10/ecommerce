import express from 'express'
import { getAddress, getUser, getUsers, postAddress } from '../controllers/user/user.controller.js'
import { deleteUsers } from '../controllers/user/user.controller.js'
import { isAuthenticated } from '../middlewares/authenticated.js'

const router = express.Router()
router.get('/getallusers', getUsers)
router.get('/getuser', isAuthenticated, getUser)
router.get('/getaddress', isAuthenticated, getAddress)
router.post('/postaddress', isAuthenticated, postAddress)
router.get('/deleteallusers', deleteUsers)

export default router