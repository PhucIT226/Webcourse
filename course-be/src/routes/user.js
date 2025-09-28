import express from 'express';
import middlewares from '../middlewares/index.js';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/users.js';

const router = express.Router();

// Admin thao tác tất cả user
router.get('/', middlewares.auth, middlewares.role.allowRoles('admin'), getAllUsers);
router.get('/:id', middlewares.auth, middlewares.role.allowRoles('admin'), getUserById);
router.patch('/:id', middlewares.auth, middlewares.role.allowRoles('admin'), updateUser);
router.delete('/:id', middlewares.auth, middlewares.role.allowRoles('admin'), deleteUser);

export default router;
