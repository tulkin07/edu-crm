import prisma from '../config/prisma.js';
import { AppError, buildPagination, parsePagination } from '../utils/helpers.js';
import { validate, studentSchema } from '../validators/schemas.js';

const studentInclude = {
  direction: true,
  groups: {
    include: {
      group: {
        include: { teacher: true },
      },
    },
  },
};

export const getStudents = async (query, user) => {
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
  if (query.groupId) {
    where.groups = { some: { groupId: parseInt(query.groupId, 10) } };
  }

  if (user.role === 'TEACHER' && user.teacherId) {
    where.groups = {
      some: { group: { teacherId: user.teacherId } },
    };
  }

  if (user.role === 'STUDENT' && user.studentId) {
    where.id = user.studentId;
  }

  const [students, total] = await Promise.all([
    prisma.student.findMany({
      where,
      include: studentInclude,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.student.count({ where }),
  ]);

  return { students, pagination: buildPagination(page, limit, total) };
};

export const getStudentById = async (id, user) => {
  const student = await prisma.student.findUnique({
    where: { id },
    include: studentInclude,
  });

  if (!student) {
    throw new AppError('Student not found', 404);
  }

  if (user.role === 'TEACHER' && user.teacherId) {
    const inTeacherGroup = student.groups.some((gs) => gs.group.teacherId === user.teacherId);
    if (!inTeacherGroup) {
      throw new AppError('Access denied', 403);
    }
  }

  if (user.role === 'STUDENT' && user.studentId !== id) {
    throw new AppError('Access denied', 403);
  }

  return student;
};

export const createStudent = async (body) => {
  const data = validate(studentSchema, body);

  const direction = await prisma.direction.findUnique({ where: { id: data.directionId } });
  if (!direction) {
    throw new AppError('Direction not found', 404);
  }

  return prisma.student.create({
    data: {
      ...data,
      birthDate: new Date(data.birthDate),
      status: data.status || 'ACTIVE',
    },
    include: studentInclude,
  });
};

export const updateStudent = async (id, body) => {
  const data = validate(studentSchema.partial(), body);

  const existing = await prisma.student.findUnique({ where: { id } });
  if (!existing) {
    throw new AppError('Student not found', 404);
  }

  if (data.directionId) {
    const direction = await prisma.direction.findUnique({ where: { id: data.directionId } });
    if (!direction) {
      throw new AppError('Direction not found', 404);
    }
  }

  const updateData = { ...data };
  if (data.birthDate) {
    updateData.birthDate = new Date(data.birthDate);
  }

  return prisma.student.update({
    where: { id },
    data: updateData,
    include: studentInclude,
  });
};

export const deleteStudent = async (id) => {
  const existing = await prisma.student.findUnique({ where: { id } });
  if (!existing) {
    throw new AppError('Student not found', 404);
  }

  await prisma.student.delete({ where: { id } });
};
