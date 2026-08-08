import * as authService from '../services/authService.js';
import { successResponse } from '../utils/helpers.js';

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
