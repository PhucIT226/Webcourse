// import express from 'express';
// import middlewares from '../middlewares/index.js';
// import {
//   getReviews,
//   getReviewById,
//   createReview,
//   updateReview,
//   deleteReview
// } from '../controllers/review.controller.js';

// const router = express.Router({ mergeParams: true }); // courseId

// router.get('/', getReviews); // /courses/:courseId/reviews
// router.get('/:id', getReviewById);

// router.post('/', middlewares.auth, middlewares.role('student'), createReview);
// router.patch('/:id', middlewares.auth, middlewares.role('student'), updateReview);
// router.delete('/:id', middlewares.auth, middlewares.role('student'), deleteReview);

// export default router;
