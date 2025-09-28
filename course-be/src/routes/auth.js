import express from 'express';
import middlewares from '../middlewares/index.js';
import AuthController from "../controllers/auth.controller.js";

const controller = new AuthController();
const router = express.Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/logout', controller.logout);
router.post('/refresh', controller.refreshToken);
router.get('/me', middlewares.auth, controller.getProfile);

export default router;
