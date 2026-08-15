import express from 'express';
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  googleLogin,
  generate2FA,
  verify2FA,
  disable2FA,
  login2FA
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/login/2fa', login2FA);
router.post('/google', googleLogin);
router.post('/logout', logoutUser);

// Protected routes
router.route('/me')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// 2FA Routes
router.post('/2fa/generate', protect, generate2FA);
router.post('/2fa/verify', protect, verify2FA);
router.post('/2fa/disable', protect, disable2FA);

export default router;
