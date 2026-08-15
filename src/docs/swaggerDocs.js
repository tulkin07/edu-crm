/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Authentication endpoints
 *   - name: Dashboard
 *     description: Dashboard statistics
 *   - name: Students
 *     description: Student management
 *   - name: Teachers
 *     description: Teacher management
 *   - name: Directions
 *     description: Direction management
 *   - name: Groups
 *     description: Group management
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           example:
 *             username: admin
 *             password: Admin123!
 *     responses:
 *       200:
 *         description: Login successful
 */

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User profile
 */

/**
 * @swagger
 * /api/dashboard/stats:
 *   get:
 *     summary: Get dashboard statistics
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Dashboard data
 */

/**
 * @swagger
 * /api/students:
 *   get:
 *     summary: List students
 *     tags: [Students]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: directionId
 *         schema: { type: integer }
 *       - in: query
 *         name: groupId
 *         schema: { type: integer }
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [ACTIVE, INACTIVE, GRADUATED] }
 *       - in: query
 *         name: page
 *         schema: { type: integer, example: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, example: 10 }
 *     responses:
 *       200:
 *         description: Paginated students list
 *   post:
 *     summary: Create student
 *     description: Required fields - fullName, phone, birthDate, gender, directionId, level. Optional - status.
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateStudentRequest'
 *           example:
 *             fullName: Ali Karimov
 *             phone: "+998901234567"
 *             birthDate: "2005-03-15"
 *             gender: MALE
 *             directionId: 1
 *             level: BEGINNER
 *             status: ACTIVE
 *     responses:
 *       201:
 *         description: Student created
 */

/**
 * @swagger
 * /api/students/{id}:
 *   get:
 *     summary: Get student by ID
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Student details
 *   patch:
 *     summary: Update student
 *     description: Send only the fields you want to update.
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateStudentRequest'
 *           example:
 *             fullName: Ali Karimov
 *             phone: "+998901234567"
 *             birthDate: "2005-03-15"
 *             gender: MALE
 *             directionId: 1
 *             level: INTERMEDIATE
 *             status: ACTIVE
 *     responses:
 *       200:
 *         description: Student updated
 *   delete:
 *     summary: Delete student
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Student deleted
 */

/**
 * @swagger
 * /api/teachers:
 *   get:
 *     summary: List teachers
 *     tags: [Teachers]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: page
 *         schema: { type: integer, example: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, example: 10 }
 *     responses:
 *       200:
 *         description: Teachers list
 *   post:
 *     summary: Create teacher
 *     description: Required fields - fullName, phone, directionId, experience. Optional - status.
 *     tags: [Teachers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTeacherRequest'
 *           example:
 *             fullName: John Smith
 *             phone: "+998901234567"
 *             directionId: 1
 *             experience: 5
 *             status: ACTIVE
 *     responses:
 *       201:
 *         description: Teacher created
 */

/**
 * @swagger
 * /api/teachers/{id}:
 *   get:
 *     summary: Get teacher by ID
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Teacher details
 *   patch:
 *     summary: Update teacher
 *     description: Send only the fields you want to update.
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTeacherRequest'
 *           example:
 *             fullName: John Smith
 *             phone: "+998901234567"
 *             directionId: 1
 *             experience: 6
 *             status: ACTIVE
 *     responses:
 *       200:
 *         description: Teacher updated
 *   delete:
 *     summary: Delete teacher
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Teacher deleted
 */

/**
 * @swagger
 * /api/directions:
 *   get:
 *     summary: List directions
 *     tags: [Directions]
 *     responses:
 *       200:
 *         description: Directions list
 *   post:
 *     summary: Create direction
 *     description: Required field - name. Optional - description, status.
 *     tags: [Directions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDirectionRequest'
 *           example:
 *             name: Frontend
 *             description: Web frontend development courses
 *             status: ACTIVE
 *     responses:
 *       201:
 *         description: Direction created
 */

/**
 * @swagger
 * /api/directions/{id}:
 *   get:
 *     summary: Get direction by ID
 *     tags: [Directions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Direction details
 *   patch:
 *     summary: Update direction
 *     description: Send only the fields you want to update.
 *     tags: [Directions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateDirectionRequest'
 *           example:
 *             name: Frontend
 *             description: Web frontend development courses
 *             status: ACTIVE
 *     responses:
 *       200:
 *         description: Direction updated
 *   delete:
 *     summary: Delete direction
 *     tags: [Directions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Direction deleted
 */

/**
 * @swagger
 * /api/groups:
 *   get:
 *     summary: List groups
 *     tags: [Groups]
 *     responses:
 *       200:
 *         description: Groups list
 *   post:
 *     summary: Create group
 *     description: Required fields - name, directionId, teacherId, startDate, lessonDays, startTime. Optional - status.
 *     tags: [Groups]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateGroupRequest'
 *           example:
 *             name: Frontend Morning A
 *             directionId: 1
 *             teacherId: 1
 *             startDate: "2025-01-15"
 *             lessonDays: [MONDAY, WEDNESDAY, FRIDAY]
 *             startTime: "09:00"
 *             status: ACTIVE
 *     responses:
 *       201:
 *         description: Group created
 */

/**
 * @swagger
 * /api/groups/{id}:
 *   get:
 *     summary: Get group by ID
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Group details
 *   patch:
 *     summary: Update group
 *     description: Send only the fields you want to update.
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateGroupRequest'
 *           example:
 *             name: Frontend Morning A
 *             directionId: 1
 *             teacherId: 1
 *             startDate: "2025-01-15"
 *             lessonDays: [MONDAY, WEDNESDAY, FRIDAY]
 *             startTime: "09:00"
 *             status: ACTIVE
 *     responses:
 *       200:
 *         description: Group updated
 *   delete:
 *     summary: Delete group
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Group deleted
 */

/**
 * @swagger
 * /api/groups/{id}/students:
 *   post:
 *     summary: Add student to group
 *     description: Send the student ID to add that student to the group.
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *         description: Group ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddStudentToGroupRequest'
 *           example:
 *             studentId: 1
 *     responses:
 *       200:
 *         description: Student added
 */

/**
 * @swagger
 * /api/groups/{id}/students/{studentId}:
 *   delete:
 *     summary: Remove student from group
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *       - in: path
 *         name: studentId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Student removed
 */
