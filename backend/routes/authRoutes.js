import express from 'express'
import { auth, changePassword, forgotPassword, login, logout, refreshAccessToken, register, registerAdmin, resetPassword } from '../controllers/Auth/auth.controller.js'
import { isAuthenticated } from '../middlewares/authenticated.js'
import { isAuthorized } from '../middlewares/authorized.js'

const router = express.Router()

router.post('/login', login)
router.post('/register', register)

router.post('/logout', isAuthenticated, logout)
router.post('/refresh-token', refreshAccessToken)
router.get('/session', isAuthenticated, auth)

router.post('/password/forgot', forgotPassword)
router.post('/password/reset/:id', isAuthenticated, resetPassword)
router.post('/password/change', isAuthenticated, changePassword)

router.get('/admin/register', isAuthenticated, isAuthorized('admin'), registerAdmin)

// router.get('/getusers', getUsers)
// router.get('/getuser', isAuthenticated, getUser)
// router.get('/getaddress', isAuthenticated, getAddress)
// router.post('/postaddress', isAuthenticated, postAddress)

// //test route
// router.get('/deleteAllUsers', deleteUsers)

export default router