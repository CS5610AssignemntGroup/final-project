import express from 'express';
import {
    insertProduct,
    deleteProductById,
    updateProductById,
    getAllProducts,
    getProductById,
    insertProductReview,
    getTopRatedProducts,
} from '../dbController/productDBController.js';
import { protect, admin } from '../middleware/authorization.js';

const router = express.Router();

router.route('/').get(getAllProducts).post(protect, admin, insertProduct);
router.route('/:id/reviews').post(protect, insertProductReview);
router.get('/top', getTopRatedProducts);
router
    .route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProductById)
    .put(protect, admin, updateProductById);

export default router;
