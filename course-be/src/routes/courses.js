// import express from 'express';
// import middlewares from '../middlewares/index.js';
// import {
//   getAllCourses,
//   getCourseById,
//   createCourse,
//   updateCourse,
//   deleteCourse,
//   getInstructorCourses,
//   getInstructorStudents,
//   getInstructorRevenue,
// } from '../controllers/course.controller.js';

// const router = express.Router();

// router.get('/', getAllCourses);
// router.get('/:id', getCourseById);

// // ===== Instructor/Admin =====
// router.post('/', middlewares.auth, middlewares.role('instructor', 'admin'), createCourse);
// router.patch('/:id', middlewares.auth, middlewares.role('instructor', 'admin'), updateCourse);
// router.delete('/:id', middlewares.auth, middlewares.role('instructor', 'admin'), deleteCourse);

// // ===== Instructor Dashboard =====
// router.get('/instructors/me/courses', middlewares.auth, middlewares.role('instructor'), getInstructorCourses);
// router.get('/instructors/me/students', middlewares.auth, middlewares.role('instructor'), getInstructorStudents);
// router.get('/instructors/me/revenue', middlewares.auth, middlewares.role('instructor'), getInstructorRevenue);

// export default router;
