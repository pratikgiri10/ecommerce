import express from 'express';
import { getProductById, getProductDetails, postProductDetails, updateProduct } from '../controllers/product/product.controller.js';
import { upload } from '../middlewares/multer.js'
import { isAuthenticated } from '../middlewares/authenticated.js';
import { isAuthorized } from '../middlewares/authorized.js';

const router = express.Router();

router.post('/post/productDetails', isAuthenticated, isAuthorized('admin'), upload.fields([{ name: 'prod_image', maxCount: 5 }]), postProductDetails);
router.get('/get/productDetails', getProductDetails)
router.get('/get/productDetailsById/:id', isAuthenticated, getProductById)
router.put('/updateproduct/:id', isAuthenticated, isAuthorized('admin'), updateProduct)

export default router