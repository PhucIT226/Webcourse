// import express from 'express';
// import middlewares from '../middlewares/index.js';
// import {
//   getAllCourses,
//   getCourseById,
//   createCourse,
//   updateCourse,
//   deleteCourse,
// } from '../controllers/course.controller.js';

// const router = express.Router();

// router.get('/', getAllCourses);
// router.get('/:id', getCourseById);

// // Instructor hoặc Admin mới thao tác
// router.post('/', middlewares.auth, middlewares.role('instructor', 'admin'), createCourse);
// router.patch('/:id', middlewares.auth, middlewares.role('instructor', 'admin'), updateCourse);
// router.delete('/:id', middlewares.auth, middlewares.role('instructor', 'admin'), deleteCourse);

// export default router;
