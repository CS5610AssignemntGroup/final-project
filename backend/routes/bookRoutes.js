import express from 'express';
const router = express.Router();
import {
    deleteBook,
    createBook,
    updateBook,
    createBookReview,
} from '../controllers/bookController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, admin, createBook);
router.route('/:id/reviews').post(protect, createBookReview);
router
    .route('/:id')
    .delete(protect, admin, deleteBook)
    .put(protect, admin, updateBook);

export default router;
