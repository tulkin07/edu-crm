import prisma from '../config/prisma.js';
import { AppError, buildPagination, parsePagination } from '../utils/helpers.js';
import { validate, groupSchema, addStudentToGroupSchema } from '../validators/schemas.js';

const groupInclude = {
  direction: true,
  teacher: true,
  students: {
    include: { student: true },
  },
};

export const getGroups = async (query, user) => {
  const { page, limit, skip } = parsePagination(query);
  const where = {};

  if (query.search) {
    where.name = { contains: query.search, mode: 'insensitive' };
  }
  if (query.directionId) {
    where.directionId = parseInt(query.directionId, 10);
  }
  if (query.teacherId) {
    where.teacherId = parseInt(query.teacherId, 10);
  }
  if (query.status) {
    where.status = query.status;
  }

  if (user.role === 'TEACHER' && user.teacherId) {
    where.teacherId = user.teacherId;
  }

  if (user.role === 'STUDENT' && user.studentId) {
    where.students = { some: { studentId: user.studentId } };
  }

  const [groups, total] = await Promise.all([
    prisma.group.findMany({
      where,
      include: groupInclude,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.group.count({ where }),
  ]);

  const groupsWithCount = groups.map((g) => ({
    ...g,
    studentsCount: g.students.length,
  }));

  return { groups: groupsWithCount, pagination: buildPagination(page, limit, total) };
};

export const getGroupById = async (id, user) => {
  const group = await prisma.group.findUnique({
    where: { id },
    include: groupInclude,
  });

  if (!group) {
    throw new AppError('Group not found', 404);
  }

  if (user.role === 'TEACHER' && user.teacherId !== group.teacherId) {
    throw new AppError('Access denied', 403);
  }

  if (user.role === 'STUDENT' && user.studentId) {
    const isMember = group.students.some((gs) => gs.studentId === user.studentId);
    if (!isMember) {
      throw new AppError('Access denied', 403);
    }
  }

  return { ...group, studentsCount: group.students.length };
};

export const createGroup = async (body) => {
  const data = validate(groupSchema, body);

  const [direction, teacher] = await Promise.all([
    prisma.direction.findUnique({ where: { id: data.directionId } }),
    prisma.teacher.findUnique({ where: { id: data.teacherId } }),
  ]);

  if (!direction) throw new AppError('Direction not found', 404);
  if (!teacher) throw new AppError('Teacher not found', 404);

  const group = await prisma.group.create({
    data: {
      ...data,
      startDate: new Date(data.startDate),
      status: data.status || 'ACTIVE',
    },
    include: groupInclude,
  });

  return { ...group, studentsCount: group.students.length };
};

export const updateGroup = async (id, body) => {
  const data = validate(groupSchema.partial(), body);

  const existing = await prisma.group.findUnique({ where: { id } });
  if (!existing) {
    throw new AppError('Group not found', 404);
  }

  if (data.directionId) {
    const direction = await prisma.direction.findUnique({ where: { id: data.directionId } });
    if (!direction) throw new AppError('Direction not found', 404);
  }

  if (data.teacherId) {
    const teacher = await prisma.teacher.findUnique({ where: { id: data.teacherId } });
    if (!teacher) throw new AppError('Teacher not found', 404);
  }

  const updateData = { ...data };
  if (data.startDate) {
    updateData.startDate = new Date(data.startDate);
  }

  const group = await prisma.group.update({
    where: { id },
    data: updateData,
    include: groupInclude,
  });

  return { ...group, studentsCount: group.students.length };
};

export const deleteGroup = async (id) => {
  const existing = await prisma.group.findUnique({ where: { id } });
  if (!existing) {
    throw new AppError('Group not found', 404);
  }

  await prisma.group.delete({ where: { id } });
};

export const addStudentToGroup = async (groupId, body) => {
  const { studentId } = validate(addStudentToGroupSchema, body);

  const [group, student] = await Promise.all([
    prisma.group.findUnique({ where: { id: groupId } }),
    prisma.student.findUnique({ where: { id: studentId } }),
  ]);

  if (!group) throw new AppError('Group not found', 404);
  if (!student) throw new AppError('Student not found', 404);

  const existing = await prisma.groupStudent.findUnique({
    where: { groupId_studentId: { groupId, studentId } },
  });

  if (existing) {
    throw new AppError('Student is already in this group', 409);
  }

  await prisma.groupStudent.create({ data: { groupId, studentId } });

  return getGroupById(groupId, { role: 'ADMIN' });
};

export const removeStudentFromGroup = async (groupId, studentId) => {
  const existing = await prisma.groupStudent.findUnique({
    where: { groupId_studentId: { groupId, studentId } },
  });

  if (!existing) {
    throw new AppError('Student is not in this group', 404);
  }

  await prisma.groupStudent.delete({
    where: { groupId_studentId: { groupId, studentId } },
  });
};
