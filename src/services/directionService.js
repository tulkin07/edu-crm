import prisma from '../config/prisma.js';
import { AppError, buildPagination, parsePagination } from '../utils/helpers.js';
import { validate, directionSchema } from '../validators/schemas.js';

export const getDirections = async (query) => {
  const { page, limit, skip } = parsePagination(query);
  const where = {};

  if (query.search) {
    where.name = { contains: query.search, mode: 'insensitive' };
  }
  if (query.status) {
    where.status = query.status;
  }

  const [directions, total] = await Promise.all([
    prisma.direction.findMany({
      where,
      skip,
      take: limit,
      orderBy: { name: 'asc' },
    }),
    prisma.direction.count({ where }),
  ]);

  return { directions, pagination: buildPagination(page, limit, total) };
};

export const getDirectionById = async (id) => {
  const direction = await prisma.direction.findUnique({
    where: { id },
    include: {
      _count: { select: { students: true, teachers: true, groups: true } },
    },
  });

  if (!direction) {
    throw new AppError('Direction not found', 404);
  }

  return direction;
};

export const createDirection = async (body) => {
  const data = validate(directionSchema, body);

  return prisma.direction.create({
    data: { ...data, status: data.status || 'ACTIVE' },
  });
};

export const updateDirection = async (id, body) => {
  const data = validate(directionSchema.partial(), body);

  const existing = await prisma.direction.findUnique({ where: { id } });
  if (!existing) {
    throw new AppError('Direction not found', 404);
  }

  return prisma.direction.update({ where: { id }, data });
};

export const deleteDirection = async (id) => {
  const existing = await prisma.direction.findUnique({ where: { id } });
  if (!existing) {
    throw new AppError('Direction not found', 404);
  }

  const [students, teachers, groups] = await Promise.all([
    prisma.student.count({ where: { directionId: id } }),
    prisma.teacher.count({ where: { directionId: id } }),
    prisma.group.count({ where: { directionId: id } }),
  ]);

  if (students > 0 || teachers > 0 || groups > 0) {
    throw new AppError('Cannot delete direction with related records', 400);
  }

  await prisma.direction.delete({ where: { id } });
};
