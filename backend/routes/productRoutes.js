import express from 'express';
import { postProductDetails } from '../controllers/product/product.controller.js';
import { upload } from '../middlewares/multer.js'
const router = express.Router();

router.post('/post/productDetails', upload.fields([{name: 'prod_image', maxCount: 5}]),postProductDetails)

export default router