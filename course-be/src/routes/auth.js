import express from 'express';
import middlewares from '../middlewares/index.js';
import {
  register,
  login,
  logout,
  refreshToken,
  getMe,
} from '../controllers/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/refresh', refreshToken);
router.get('/me', middlewares.auth, getMe);

export default router;
