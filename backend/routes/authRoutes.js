import express from 'express'
import {auth, login, register } from '../controllers/Auth/auth.controller.js'

const router  = express.Router()

router.post('/login', login)
router.post('/register', register)
router.get('/session', auth)
export default router