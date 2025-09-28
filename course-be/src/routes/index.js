import express from 'express';

// Import routes từng module
import authRoutes from './auth.js';
import rolesRoutes from './roles.js';
import usersRoutes from './users.js';
import profilesRoutes from './profiles.js';
import categoriesRoutes from './categories.js';
import coursesRoutes from './courses.js';
import lessonsRoutes from './lessons.js';
import ordersRoutes from './orders.js';
import orderItemsRoutes from './orderItems.js';
import enrollmentsRoutes from './enrollments.js';
import couponsRoutes from './coupons.js';
import reviewsRoutes from './reviews.js';
import certificatesRoutes from './certificates.js';
import uploadsRoutes from './uploads.js';

const router = express.Router();

// Prefix tất cả route với /api/v1
router.use('/auth', authRoutes);
router.use('/roles', rolesRoutes);
router.use('/users', usersRoutes);
router.use('/profiles', profilesRoutes);
router.use('/categories', categoriesRoutes);
router.use('/courses', coursesRoutes);
router.use('/uploads', uploadsRoutes);

// Nested routes
router.use('/courses/:courseId/lessons', lessonsRoutes);
router.use('/orders/:orderId/items', orderItemsRoutes);
router.use('/courses/:courseId/reviews', reviewsRoutes);

// Các route còn lại
router.use('/orders', ordersRoutes);
router.use('/enrollments', enrollmentsRoutes);
router.use('/coupons', couponsRoutes);
router.use('/certificates', certificatesRoutes);

export default router;
