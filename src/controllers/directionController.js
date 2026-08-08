import * as directionService from '../services/directionService.js';
import { paginatedResponse, successResponse } from '../utils/helpers.js';

export const getAll = async (req, res, next) => {
  try {
    const result = await directionService.getDirections(req.query);
    paginatedResponse(res, result.directions, result.pagination);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const direction = await directionService.getDirectionById(parseInt(req.params.id, 10));
    successResponse(res, direction);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const direction = await directionService.createDirection(req.body);
    successResponse(res, direction, 'Direction created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const direction = await directionService.updateDirection(parseInt(req.params.id, 10), req.body);
    successResponse(res, direction, 'Direction updated successfully');
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await directionService.deleteDirection(parseInt(req.params.id, 10));
    successResponse(res, null, 'Direction deleted successfully');
  } catch (error) {
    next(error);
  }
};
