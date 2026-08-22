import { Router } from 'express';
import * as authController from '../controllers/authController.js';
import { authenticate } from '../middlewares/auth.js';
import { handleUploadError, uploadAvatar } from '../middlewares/upload.js';

const router = Router();

router.post('/login', authController.login);
router.get('/me', authenticate, authController.getMe);
router.patch(
  '/me',
  authenticate,
  uploadAvatar.single('img'),
  handleUploadError,
  authController.updateMe
);

export default router;
