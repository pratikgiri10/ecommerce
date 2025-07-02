import express from 'express';
import { postProductDetails } from '../controllers/product/product.controller.js';
import { upload } from '../middlewares/multer.js'
const router = express.Router();

router.post('/post/productDetails', upload.single('prod_image') ,postProductDetails)

export default router