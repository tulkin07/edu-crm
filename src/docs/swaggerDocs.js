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
 *         schema: { type: string }
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: limit
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Paginated students list
 *   post:
 *     summary: Create student
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
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
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
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
 *     responses:
 *       200:
 *         description: Teachers list
 *   post:
 *     summary: Create teacher
 *     tags: [Teachers]
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
 *     tags: [Teachers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
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
 *     tags: [Directions]
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
 *     tags: [Directions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
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
 *     tags: [Groups]
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
 *     tags: [Groups]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
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
 *             type: object
 *             properties:
 *               studentId:
 *                 type: integer
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
