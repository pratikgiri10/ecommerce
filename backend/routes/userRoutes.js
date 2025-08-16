import express from 'express'
import { getAddress, getUser, getUsers, updateAddress, updateUser } from '../controllers/user/user.controller.js'
import { deleteUsers } from '../controllers/user/user.controller.js'
import { isAuthenticated } from '../middlewares/authenticated.js'
import { isAuthorized } from '../middlewares/authorized.js'

const router = express.Router()

router.get('/getallusers', isAuthenticated, isAuthorized('admin'), getUsers)
router.get('/getuser', isAuthenticated, getUser)
router.get('/getaddress', isAuthenticated, getAddress)
router.put('/updateuser/:id', isAuthenticated, updateUser)
router.put('/updateaddress', isAuthenticated, updateAddress)
router.get('/deleteallusers', isAuthenticated, isAuthorized('admin'), deleteUsers)

export default router