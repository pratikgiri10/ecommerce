import express from 'express';
import { getProductById, getProductDetails, postProductDetails } from '../controllers/product/product.controller.js';
import { upload } from '../middlewares/multer.js'
const router = express.Router();

router.post('/post/productDetails', upload.fields([{name: 'prod_image', maxCount: 5}]),postProductDetails);
router.get('/get/productDetails', getProductDetails)
router.get('/get/productDetails/:id', getProductById)

export default router