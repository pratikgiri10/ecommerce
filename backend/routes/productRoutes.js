import express from 'express';
import { postProductDetails } from '../controllers/product/product.controller';

const router = express.Router();

router.post('post/productDetails', postProductDetails)

export { router }