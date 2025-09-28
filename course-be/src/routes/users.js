// import express from 'express';
// import middlewares from '../middlewares/index.js';
// import {
//   getAllUsers,
//   getUserById,
//   updateUser,
//   deleteUser,
// } from '../controllers/user.controller.js';

// const router = express.Router();

// // Admin thao tác tất cả user
// router.get('/', middlewares.auth, middlewares.role('admin'), getAllUsers);
// router.get('/:id', middlewares.auth, middlewares.role('admin'), getUserById);
// router.patch('/:id', middlewares.auth, middlewares.role('admin'), updateUser);
// router.delete('/:id', middlewares.auth, middlewares.role('admin'), deleteUser);

// export default router;
