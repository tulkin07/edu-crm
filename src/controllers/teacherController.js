import * as teacherService from '../services/teacherService.js';
import { paginatedResponse, successResponse } from '../utils/helpers.js';

export const getAll = async (req, res, next) => {
  try {
    const result = await teacherService.getTeachers(req.query, req.user);
    paginatedResponse(res, result.teachers, result.pagination);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const teacher = await teacherService.getTeacherById(parseInt(req.params.id, 10), req.user);
    successResponse(res, teacher);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const teacher = await teacherService.createTeacher(req.body);
    successResponse(res, teacher, 'Teacher created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const teacher = await teacherService.updateTeacher(parseInt(req.params.id, 10), req.body);
    successResponse(res, teacher, 'Teacher updated successfully');
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await teacherService.deleteTeacher(parseInt(req.params.id, 10));
    successResponse(res, null, 'Teacher deleted successfully');
  } catch (error) {
    next(error);
  }
};
