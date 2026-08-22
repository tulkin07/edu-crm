import bcrypt from 'bcryptjs';
import prisma from '../config/prisma.js';
import { generateToken } from '../utils/jwt.js';
import { validate, loginSchema, updateMeSchema } from '../validators/schemas.js';
import { AppError, omitPassword } from '../utils/helpers.js';
import { deleteUploadedFile } from '../utils/fileUtils.js';

export const login = async (username, password) => {
  const data = validate(loginSchema, { username, password });

  const user = await prisma.user.findUnique({
    where: { username: data.username },
    include: {
      student: { include: { direction: true, groups: { include: { group: { include: { teacher: true, direction: true } } } } } },
      teacher: { include: { direction: true, groups: { include: { direction: true, students: { include: { student: true } } } } } },
    },
  });

  if (!user) {
    throw new AppError('Invalid username or password', 401);
  }

  const isValid = await bcrypt.compare(data.password, user.password);
  if (!isValid) {
    throw new AppError('Invalid username or password', 401);
  }

  const token = generateToken({ id: user.id, role: user.role });
  return { token, user: omitPassword(user) };
};

export const getMe = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      student: {
        include: {
          direction: true,
          groups: {
            include: {
              group: {
                include: { teacher: true, direction: true },
              },
            },
          },
        },
      },
      teacher: {
        include: {
          direction: true,
          groups: {
            include: {
              direction: true,
              students: { include: { student: true } },
            },
          },
        },
      },
    },
  });

  if (!user) {
    throw new AppError('User not found', 404);
  }

  return omitPassword(user);
};

export const updateMe = async (userId, body) => {
  const data = validate(updateMeSchema, body);

  const currentUser = await prisma.user.findUnique({ where: { id: userId } });
  if (!currentUser) {
    throw new AppError('User not found', 404);
  }

  if (data.email) {
    const existing = await prisma.user.findFirst({
      where: { email: data.email, NOT: { id: userId } },
    });
    if (existing) {
      throw new AppError('Email already in use', 409);
    }
  }

  if (data.img && currentUser.img && data.img !== currentUser.img) {
    await deleteUploadedFile(currentUser.img);
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data,
    include: {
      student: {
        include: {
          direction: true,
          groups: {
            include: {
              group: {
                include: { teacher: true, direction: true },
              },
            },
          },
        },
      },
      teacher: {
        include: {
          direction: true,
          groups: {
            include: {
              direction: true,
              students: { include: { student: true } },
            },
          },
        },
      },
    },
  });

  return omitPassword(user);
};
