import express from 'express';
import middlewares from '../middlewares/index.js';
import {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from '../controllers/roles.js';

const router = express.Router();

// Public hoặc admin mới thao tác roles
router.get('/', middlewares.auth, middlewares.role.allowRoles('admin'), getAllRoles);
router.post('/', middlewares.auth, middlewares.role.allowRoles('admin'), createRole);
router.get('/:id', middlewares.auth, middlewares.role.allowRoles('admin'), getRoleById);
router.patch('/:id', middlewares.auth, middlewares.role.allowRoles('admin'), updateRole);
router.delete('/:id', middlewares.auth, middlewares.role.allowRoles('admin'), deleteRole);

export default router;
