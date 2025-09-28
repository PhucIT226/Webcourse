// import express from 'express';
// import middlewares from '../middlewares/index.js';
// import {
//   getLessons,
//   getLessonById,
//   createLesson,
//   updateLesson,
//   deleteLesson
// } from '../controllers/lesson.controller.js';

// const router = express.Router({ mergeParams: true }); // để nhận courseId từ params

// router.get('/', getLessons); // /courses/:courseId/lessons
// router.get('/:id', getLessonById);

// router.post('/', middlewares.auth, middlewares.role('instructor'), createLesson);
// router.patch('/:id', middlewares.auth, middlewares.role('instructor'), updateLesson);
// router.delete('/:id', middlewares.auth, middlewares.role('instructor'), deleteLesson);

// export default router;
