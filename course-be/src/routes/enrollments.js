import express from 'express';
import middlewares from '../middlewares/index.js';
import {
  getUserEnrollments,
  getCourseEnrollments,
  getEnrollmentById,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment
} from '../controllers/enrollments.js';

const router = express.Router();

router.get('/users/:userId/enrollments', middlewares.auth, getUserEnrollments);
router.get('/courses/:courseId/enrollments', middlewares.auth, middlewares.role.allowRoles('instructor','admin'), getCourseEnrollments);
router.get('/:id', middlewares.auth, getEnrollmentById);
router.post('/', middlewares.auth, middlewares.role.allowRoles('instructor','admin'), createEnrollment);
router.patch('/:id', middlewares.auth, middlewares.role.allowRoles('instructor','admin'), updateEnrollment);
router.delete('/:id', middlewares.auth, middlewares.role.allowRoles('admin'), deleteEnrollment);

export default router;
