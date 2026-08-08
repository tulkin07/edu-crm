import prisma from '../config/prisma.js';
import { AppError, buildPagination, parsePagination } from '../utils/helpers.js';
import { validate, teacherSchema } from '../validators/schemas.js';

const teacherInclude = {
  direction: true,
  groups: {
    include: {
      direction: true,
      students: { include: { student: true } },
    },
  },
};

export const getTeachers = async (query, user) => {
  const { page, limit, skip } = parsePagination(query);
  const where = {};

  if (query.search) {
    where.fullName = { contains: query.search, mode: 'insensitive' };
  }
  if (query.directionId) {
    where.directionId = parseInt(query.directionId, 10);
  }
  if (query.status) {
    where.status = query.status;
  }

  if (user.role === 'TEACHER' && user.teacherId) {
    where.id = user.teacherId;
  }

  const [teachers, total] = await Promise.all([
    prisma.teacher.findMany({
      where,
      include: teacherInclude,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.teacher.count({ where }),
  ]);

  return { teachers, pagination: buildPagination(page, limit, total) };
};

export const getTeacherById = async (id, user) => {
  const teacher = await prisma.teacher.findUnique({
    where: { id },
    include: teacherInclude,
  });

  if (!teacher) {
    throw new AppError('Teacher not found', 404);
  }

  if (user.role === 'TEACHER' && user.teacherId !== id) {
    throw new AppError('Access denied', 403);
  }

  if (user.role === 'STUDENT' && user.student) {
    const studentGroups = user.student.groups || [];
    const teacherIds = studentGroups.map((gs) => gs.group?.teacherId).filter(Boolean);
    if (!teacherIds.includes(id)) {
      throw new AppError('Access denied', 403);
    }
  }

  return teacher;
};

export const createTeacher = async (body) => {
  const data = validate(teacherSchema, body);

  const direction = await prisma.direction.findUnique({ where: { id: data.directionId } });
  if (!direction) {
    throw new AppError('Direction not found', 404);
  }

  return prisma.teacher.create({
    data: { ...data, status: data.status || 'ACTIVE' },
    include: teacherInclude,
  });
};

export const updateTeacher = async (id, body) => {
  const data = validate(teacherSchema.partial(), body);

  const existing = await prisma.teacher.findUnique({ where: { id } });
  if (!existing) {
    throw new AppError('Teacher not found', 404);
  }

  if (data.directionId) {
    const direction = await prisma.direction.findUnique({ where: { id: data.directionId } });
    if (!direction) {
      throw new AppError('Direction not found', 404);
    }
  }

  return prisma.teacher.update({
    where: { id },
    data,
    include: teacherInclude,
  });
};

export const deleteTeacher = async (id) => {
  const existing = await prisma.teacher.findUnique({ where: { id } });
  if (!existing) {
    throw new AppError('Teacher not found', 404);
  }

  const groupsCount = await prisma.group.count({ where: { teacherId: id } });
  if (groupsCount > 0) {
    throw new AppError('Cannot delete teacher with assigned groups', 400);
  }

  await prisma.teacher.delete({ where: { id } });
};
