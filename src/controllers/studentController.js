import * as studentService from '../services/studentService.js';
import { paginatedResponse, successResponse } from '../utils/helpers.js';

export const getAll = async (req, res, next) => {
  try {
    const result = await studentService.getStudents(req.query, req.user);
    paginatedResponse(res, result.students, result.pagination);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const student = await studentService.getStudentById(parseInt(req.params.id, 10), req.user);
    successResponse(res, student);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const student = await studentService.createStudent(req.body);
    successResponse(res, student, 'Student created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const student = await studentService.updateStudent(parseInt(req.params.id, 10), req.body);
    successResponse(res, student, 'Student updated successfully');
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await studentService.deleteStudent(parseInt(req.params.id, 10));
    successResponse(res, null, 'Student deleted successfully');
  } catch (error) {
    next(error);
  }
};
