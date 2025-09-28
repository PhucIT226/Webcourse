import express from 'express';
import middlewares from '../middlewares/index.js';
import {
  getUserOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder
} from '../controllers/orders.js';

const router = express.Router();

router.get('/users/:userId/orders', middlewares.auth, getUserOrders);
router.get('/:id', middlewares.auth, getOrderById);
router.post('/users/:userId/orders', middlewares.auth, createOrder);
router.patch('/:id', middlewares.auth, middlewares.role.allowRoles('admin'), updateOrder);
router.delete('/:id', middlewares.auth, middlewares.role.allowRoles('admin'), deleteOrder);

export default router;
