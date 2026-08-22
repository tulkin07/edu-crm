import * as authService from '../services/authService.js';
import { successResponse } from '../utils/helpers.js';
import { deleteUploadedFile } from '../utils/fileUtils.js';

export const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body.username, req.body.password);
    successResponse(res, result, 'Login successful');
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await authService.getMe(req.user.id);
    successResponse(res, user);
  } catch (error) {
    next(error);
  }
};

export const updateMe = async (req, res, next) => {
  try {
    const body = { ...req.body };

    if (req.file) {
      body.img = `/uploads/avatars/${req.file.filename}`;
    }

    const user = await authService.updateMe(req.user.id, body);
    successResponse(res, user, 'Profile updated successfully');
  } catch (error) {
    if (req.file) {
      await deleteUploadedFile(`/uploads/avatars/${req.file.filename}`);
    }
    next(error);
  }
};
