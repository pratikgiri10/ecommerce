import express from 'express'
import {auth, getAddress, getUser, getUsers, login, logout, postAddress, refreshAccessToken, register } from '../controllers/Auth/auth.controller.js'
import { isAuthenticated } from '../middlewares/authenticated.js'

const router  = express.Router()

router.post('/login', login)
router.post('/register', register)

router.post('/logout', isAuthenticated, logout)
router.post('/refresh-token', refreshAccessToken)
router.get('/session', isAuthenticated, auth)

router.get('/getusers', getUsers)
router.get('/getuser', isAuthenticated, getUser)
router.get('/getaddress', isAuthenticated, getAddress)
router.post('/postaddress', isAuthenticated, postAddress)

export default router