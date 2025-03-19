import express from 'express'
import {auth, getUser, getUsers, login, logout, refreshAccessToken, register } from '../controllers/Auth/auth.controller.js'
import { isAuthenticated } from '../middlewares/authenticated.js'

const router  = express.Router()

router.post('/login', login)
router.post('/register', register)

router.post('/logout', isAuthenticated, logout)
router.post('/refresh-token', refreshAccessToken)
router.get('/session', isAuthenticated, auth)

router.get('/getusers', getUsers)
router.get('/getuser', getUser)
export default router