import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  await prisma.groupStudent.deleteMany();
  await prisma.group.deleteMany();
  await prisma.user.deleteMany();
  await prisma.student.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.direction.deleteMany();

  const directions = await Promise.all([
    prisma.direction.create({ data: { name: 'Frontend', description: 'Web frontend development courses' } }),
    prisma.direction.create({ data: { name: 'Backend', description: 'Server-side development courses' } }),
    prisma.direction.create({ data: { name: 'Python', description: 'Python programming courses' } }),
    prisma.direction.create({ data: { name: 'Graphic Design', description: 'UI/UX and graphic design courses' } }),
    prisma.direction.create({ data: { name: 'English', description: 'General English language courses' } }),
    prisma.direction.create({ data: { name: 'IELTS', description: 'IELTS preparation courses' } }),
  ]);

  const teachers = await Promise.all([
    prisma.teacher.create({ data: { fullName: 'John Smith', phone: '+998901234567', directionId: directions[0].id, experience: 5 } }),
    prisma.teacher.create({ data: { fullName: 'Sarah Johnson', phone: '+998901234568', directionId: directions[1].id, experience: 7 } }),
    prisma.teacher.create({ data: { fullName: 'Michael Brown', phone: '+998901234569', directionId: directions[2].id, experience: 4 } }),
    prisma.teacher.create({ data: { fullName: 'Emily Davis', phone: '+998901234570', directionId: directions[4].id, experience: 6 } }),
    prisma.teacher.create({ data: { fullName: 'David Wilson', phone: '+998901234571', directionId: directions[5].id, experience: 8 } }),
  ]);

  const studentData = [
    { fullName: 'Ali Karimov', phone: '+998911111111', birthDate: new Date('2005-03-15'), gender: 'MALE', directionId: directions[0].id, level: 'BEGINNER' },
    { fullName: 'Dilnoza Rakhimova', phone: '+998911111112', birthDate: new Date('2004-07-22'), gender: 'FEMALE', directionId: directions[0].id, level: 'INTERMEDIATE' },
    { fullName: 'Jasur Toshmatov', phone: '+998911111113', birthDate: new Date('2003-11-08'), gender: 'MALE', directionId: directions[1].id, level: 'ELEMENTARY' },
    { fullName: 'Madina Yusupova', phone: '+998911111114', birthDate: new Date('2006-01-30'), gender: 'FEMALE', directionId: directions[1].id, level: 'BEGINNER' },
    { fullName: 'Bobur Nazarov', phone: '+998911111115', birthDate: new Date('2005-09-12'), gender: 'MALE', directionId: directions[2].id, level: 'INTERMEDIATE' },
    { fullName: 'Nigora Saidova', phone: '+998911111116', birthDate: new Date('2004-05-18'), gender: 'FEMALE', directionId: directions[2].id, level: 'ADVANCED' },
    { fullName: 'Rustam Kholmatov', phone: '+998911111117', birthDate: new Date('2005-12-03'), gender: 'MALE', directionId: directions[3].id, level: 'BEGINNER' },
    { fullName: 'Zarina Mirzayeva', phone: '+998911111118', birthDate: new Date('2003-08-25'), gender: 'FEMALE', directionId: directions[4].id, level: 'UPPER_INTERMEDIATE' },
    { fullName: 'Timur Abdullayev', phone: '+998911111119', birthDate: new Date('2004-02-14'), gender: 'MALE', directionId: directions[4].id, level: 'INTERMEDIATE' },
    { fullName: 'Kamola Ergasheva', phone: '+998911111120', birthDate: new Date('2005-06-07'), gender: 'FEMALE', directionId: directions[5].id, level: 'ELEMENTARY' },
    { fullName: 'Shoxrux Alimov', phone: '+998911111121', birthDate: new Date('2003-10-19'), gender: 'MALE', directionId: directions[5].id, level: 'ADVANCED' },
    { fullName: 'Malika Tursunova', phone: '+998911111122', birthDate: new Date('2006-04-28'), gender: 'FEMALE', directionId: directions[0].id, level: 'BEGINNER' },
    { fullName: 'Aziz Rakhmonov', phone: '+998911111123', birthDate: new Date('2004-11-11'), gender: 'MALE', directionId: directions[1].id, level: 'INTERMEDIATE' },
    { fullName: 'Sevara Khodjayeva', phone: '+998911111124', birthDate: new Date('2005-07-05'), gender: 'FEMALE', directionId: directions[4].id, level: 'ELEMENTARY' },
    { fullName: 'Farrukh Ismoilov', phone: '+998911111125', birthDate: new Date('2003-03-20'), gender: 'MALE', directionId: directions[5].id, level: 'UPPER_INTERMEDIATE', status: 'GRADUATED' },
  ];

  const students = await Promise.all(
    studentData.map((s) =>
      prisma.student.create({
        data: { ...s, status: s.status || 'ACTIVE' },
      })
    )
  );

  const groups = await Promise.all([
    prisma.group.create({
      data: {
        name: 'Frontend Morning A',
        directionId: directions[0].id,
        teacherId: teachers[0].id,
        startDate: new Date('2025-01-15'),
        lessonDays: ['MONDAY', 'WEDNESDAY', 'FRIDAY'],
        startTime: '09:00',
      },
    }),
    prisma.group.create({
      data: {
        name: 'Backend Evening B',
        directionId: directions[1].id,
        teacherId: teachers[1].id,
        startDate: new Date('2025-02-01'),
        lessonDays: ['TUESDAY', 'THURSDAY', 'SATURDAY'],
        startTime: '18:00',
      },
    }),
    prisma.group.create({
      data: {
        name: 'English Intermediate',
        directionId: directions[4].id,
        teacherId: teachers[3].id,
        startDate: new Date('2025-01-20'),
        lessonDays: ['MONDAY', 'WEDNESDAY', 'FRIDAY'],
        startTime: '14:00',
      },
    }),
    prisma.group.create({
      data: {
        name: 'IELTS Intensive',
        directionId: directions[5].id,
        teacherId: teachers[4].id,
        startDate: new Date('2025-03-01'),
        lessonDays: ['TUESDAY', 'THURSDAY'],
        startTime: '10:00',
      },
    }),
  ]);

  const groupStudentPairs = [
    [0, 0], [0, 1], [0, 11],
    [1, 2], [1, 3], [1, 12],
    [2, 7], [2, 8], [2, 13],
    [3, 9], [3, 10], [3, 14],
  ];

  for (const [groupIdx, studentIdx] of groupStudentPairs) {
    await prisma.groupStudent.create({
      data: { groupId: groups[groupIdx].id, studentId: students[studentIdx].id },
    });
  }

  const hashPassword = async (password) => bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      username: 'admin',
      password: await hashPassword('Admin123!'),
      role: 'ADMIN',
    },
  });

  await prisma.user.create({
    data: {
      username: 'reception',
      password: await hashPassword('Reception123!'),
      role: 'RECEPTION',
    },
  });

  await prisma.user.create({
    data: {
      username: 'teacher',
      password: await hashPassword('Teacher123!'),
      role: 'TEACHER',
      teacherId: teachers[0].id,
    },
  });

  await prisma.user.create({
    data: {
      username: 'student',
      password: await hashPassword('Student123!'),
      role: 'STUDENT',
      studentId: students[0].id,
    },
  });

  console.log('Seed completed successfully!');
  console.log('Default users: admin, reception, teacher, student');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
