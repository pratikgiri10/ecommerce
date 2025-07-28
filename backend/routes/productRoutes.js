import express from 'express';
import { getProductById, getProductDetails, postProductDetails, updateProduct } from '../controllers/product/product.controller.js';
import { upload } from '../middlewares/multer.js'
const router = express.Router();

router.post('/post/productDetails', upload.fields([{name: 'prod_image', maxCount: 5}]),postProductDetails);
router.get('/get/productDetails', getProductDetails)
router.get('/get/productDetailsById/:id', getProductById)
router.put('/updateproduct/:id', updateProduct)
export default router