import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  googleLogin,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/google', googleLogin);
router.post('/logout', logoutUser);
router.route('/me').get(protect, getUserProfile); // Protected route

export default router;
