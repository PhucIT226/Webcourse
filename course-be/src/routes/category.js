import express from 'express';
import middlewares from '../middlewares/index.js';
import {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categories.js';

const router = express.Router();

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);

// Admin mới tạo, sửa, xóa
router.post('/', middlewares.auth, middlewares.role.allowRoles('admin'), createCategory);
router.patch('/:id', middlewares.auth, middlewares.role.allowRoles('admin'), updateCategory);
router.delete('/:id', middlewares.auth, middlewares.role.allowRoles('admin'), deleteCategory);

export default router;
