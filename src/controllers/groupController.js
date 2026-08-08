import * as groupService from '../services/groupService.js';
import { paginatedResponse, successResponse } from '../utils/helpers.js';

export const getAll = async (req, res, next) => {
  try {
    const result = await groupService.getGroups(req.query, req.user);
    paginatedResponse(res, result.groups, result.pagination);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const group = await groupService.getGroupById(parseInt(req.params.id, 10), req.user);
    successResponse(res, group);
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const group = await groupService.createGroup(req.body);
    successResponse(res, group, 'Group created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const group = await groupService.updateGroup(parseInt(req.params.id, 10), req.body);
    successResponse(res, group, 'Group updated successfully');
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    await groupService.deleteGroup(parseInt(req.params.id, 10));
    successResponse(res, null, 'Group deleted successfully');
  } catch (error) {
    next(error);
  }
};

export const addStudent = async (req, res, next) => {
  try {
    const group = await groupService.addStudentToGroup(parseInt(req.params.id, 10), req.body);
    successResponse(res, group, 'Student added to group successfully');
  } catch (error) {
    next(error);
  }
};

export const removeStudent = async (req, res, next) => {
  try {
    await groupService.removeStudentFromGroup(
      parseInt(req.params.id, 10),
      parseInt(req.params.studentId, 10)
    );
    successResponse(res, null, 'Student removed from group successfully');
  } catch (error) {
    next(error);
  }
};
