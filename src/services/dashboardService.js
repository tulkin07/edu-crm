import prisma from '../config/prisma.js';

export const getDashboardStats = async (user) => {
  if (user.role === 'STUDENT') {
    const student = await prisma.student.findUnique({
      where: { id: user.studentId },
      include: {
        direction: true,
        groups: {
          include: {
            group: { include: { teacher: true, direction: true } },
          },
        },
      },
    });
    return { profile: student };
  }

  if (user.role === 'TEACHER') {
    const [groups, students] = await Promise.all([
      prisma.group.count({ where: { teacherId: user.teacherId } }),
      prisma.groupStudent.count({
        where: { group: { teacherId: user.teacherId } },
      }),
    ]);

    const recentGroups = await prisma.group.findMany({
      where: { teacherId: user.teacherId },
      include: { direction: true, teacher: true, students: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    const recentStudents = await prisma.student.findMany({
      where: {
        groups: { some: { group: { teacherId: user.teacherId } } },
      },
      include: { direction: true, groups: { include: { group: true } } },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    return {
      stats: { groups, students },
      recentGroups: recentGroups.map((g) => ({ ...g, studentsCount: g.students.length })),
      recentStudents,
    };
  }

  const [totalStudents, totalTeachers, totalGroups, totalDirections] = await Promise.all([
    prisma.student.count(),
    prisma.teacher.count(),
    prisma.group.count(),
    prisma.direction.count(),
  ]);

  const recentStudents = await prisma.student.findMany({
    include: { direction: true, groups: { include: { group: true } } },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  const recentGroups = await prisma.group.findMany({
    include: { direction: true, teacher: true, students: true },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  return {
    stats: {
      totalStudents,
      totalTeachers,
      totalGroups,
      totalDirections,
    },
    recentStudents,
    recentGroups: recentGroups.map((g) => ({ ...g, studentsCount: g.students.length })),
  };
};
