// import express from 'express';
// import middlewares from '../middlewares/index.js';
// import {
//   getAllRoles,
//   getRoleById,
//   createRole,
//   updateRole,
//   deleteRole,
// } from '../controllers/role.controller.js';

// const router = express.Router();

// // Public hoặc admin mới thao tác roles
// router.get('/', middlewares.auth, middlewares.role('admin'), getAllRoles);
// router.post('/', middlewares.auth, middlewares.role('admin'), createRole);
// router.get('/:id', middlewares.auth, middlewares.role('admin'), getRoleById);
// router.patch('/:id', middlewares.auth, middlewares.role('admin'), updateRole);
// router.delete('/:id', middlewares.auth, middlewares.role('admin'), deleteRole);

// export default router;
