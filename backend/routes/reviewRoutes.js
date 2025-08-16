import express from 'express'
import { deleteReview, getReviews, postReview, updateReview } from '../controllers/review/review.controller.js'
import { isAuthenticated } from '../middlewares/authenticated.js'

const router = express.Router()

router.post('/create', isAuthenticated, postReview)
router.get('/:id', isAuthenticated, getReviews)
router.put('/update/:id', isAuthenticated, updateReview)
router.delete('/delete/:id', isAuthenticated, deleteReview)

export default router