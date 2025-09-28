import express from 'express';
import middlewares from '../middlewares/index.js';
import {
  getMyProfile,
  createMyProfile,
  updateMyProfile,
  deleteMyProfile,
  getAllProfiles,
  getProfileById,
  updateProfileById,
  deleteProfileById,
} from '../controllers/profiles.js';

const router = express.Router();

// User thao tác profile của chính mình
router.get('/me', middlewares.auth, getMyProfile);
router.post('/me', middlewares.auth, createMyProfile);
router.patch('/me', middlewares.auth, updateMyProfile);
router.delete('/me', middlewares.auth, deleteMyProfile);

// Admin thao tác tất cả profile
router.get('/', middlewares.auth, middlewares.role.allowRoles('admin'), getAllProfiles);
router.get('/:id', middlewares.auth, middlewares.role.allowRoles('admin'), getProfileById);
router.patch('/:id', middlewares.auth, middlewares.role.allowRoles('admin'), updateProfileById);
router.delete('/:id', middlewares.auth, middlewares.role.allowRoles('admin'), deleteProfileById);

export default router;
