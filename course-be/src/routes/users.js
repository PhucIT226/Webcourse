import express from 'express';
import middlewares from '../middlewares/index.js';
import UserController from '../controllers/user.controller.js';

const router = express.Router();
const controller = new UserController();

// Admin thao tác tất cả user
router.get('/', middlewares.auth, middlewares.role('admin'), controller.getListUsers);
router.get('/:id', middlewares.auth, middlewares.role('admin'), controller.getUserById);
router.post('/', middlewares.auth, middlewares.role('admin'), controller.createUser);
router.patch('/:id', middlewares.auth, middlewares.role('admin'), controller.updateUser);
router.delete('/:id', middlewares.auth, middlewares.role('admin'), controller.deleteUser);

export default router;
