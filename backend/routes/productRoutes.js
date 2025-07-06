import express from 'express';
import { getProductDetails, postProductDetails } from '../controllers/product/product.controller.js';
import { upload } from '../middlewares/multer.js'
const router = express.Router();

router.post('/post/productDetails', upload.fields([{name: 'prod_image', maxCount: 5}]),postProductDetails);
router.get('/get/productDetails', getProductDetails)

export default router