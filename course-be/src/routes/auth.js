import express from 'express';
import middlewares from '../middlewares/index.js';
import AuthController from "../controllers/auth.controller.js";
import UserValidator from "../validators/user.validator.js";

const router = express.Router();
const controller = new AuthController();
const validator = new UserValidator();

router.post('/register', validator.registerSchema(), controller.register);
router.post('/login', controller.login);
router.post('/logout', controller.logout);
router.post('/refresh', controller.refreshToken);
router.get('/me', middlewares.auth, controller.getProfile);

export default router;
