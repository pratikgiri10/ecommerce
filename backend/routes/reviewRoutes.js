import express from 'express'
import { deleteReview, getReviews, postReview, updateReview } from '../controllers/review/review.controller.js'
const router = express.Router()

router.post('/create', postReview)
router.get('/:id', getReviews)
router.put('/update/:id', updateReview)
router.delete('/delete/:id', deleteReview)

export default router