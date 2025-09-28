// import express from 'express';
// import middlewares from '../middlewares/index.js';
// import {
//   getOrderItems,
//   getOrderItemById,
//   createOrderItem,
//   updateOrderItem,
//   deleteOrderItem
// } from '../controllers/orderItem.controller.js';

// const router = express.Router({ mergeParams: true }); // orderId từ params

// router.get('/', middlewares.auth, getOrderItems); // /orders/:orderId/items
// router.get('/:id', middlewares.auth, getOrderItemById);
// router.post('/', middlewares.auth, middlewares.role('admin'), createOrderItem);
// router.patch('/:id', middlewares.auth, middlewares.role('admin'), updateOrderItem);
// router.delete('/:id', middlewares.auth, middlewares.role('admin'), deleteOrderItem);

// export default router;
