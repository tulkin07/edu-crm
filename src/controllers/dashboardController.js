import * as dashboardService from '../services/dashboardService.js';
import { successResponse } from '../utils/helpers.js';

export const getStats = async (req, res, next) => {
  try {
    const data = await dashboardService.getDashboardStats(req.user);
    successResponse(res, data);
  } catch (error) {
    next(error);
  }
};
