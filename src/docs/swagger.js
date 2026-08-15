import swaggerJsdoc from 'swagger-jsdoc';
import { config } from '../config/index.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Education Center CRM API',
      version: '1.0.0',
      description: 'REST API for Education Center CRM with JWT authentication and role-based access control',
    },
    servers: [{ url: config.apiUrl || `http://localhost:${config.port}`, description: 'API server' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        LoginRequest: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: { type: 'string', example: 'admin' },
            password: { type: 'string', example: 'Admin123!' },
          },
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string' },
            data: { type: 'object' },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string' },
          },
        },
        CreateStudentRequest: {
          type: 'object',
          required: ['fullName', 'phone', 'birthDate', 'gender', 'directionId', 'level'],
          properties: {
            fullName: { type: 'string', example: 'Ali Karimov' },
            phone: { type: 'string', example: '+998901234567' },
            birthDate: { type: 'string', format: 'date', example: '2005-03-15' },
            gender: { type: 'string', enum: ['MALE', 'FEMALE'], example: 'MALE' },
            directionId: { type: 'integer', example: 1 },
            level: {
              type: 'string',
              enum: ['BEGINNER', 'ELEMENTARY', 'INTERMEDIATE', 'UPPER_INTERMEDIATE', 'ADVANCED'],
              example: 'BEGINNER',
            },
            status: { type: 'string', enum: ['ACTIVE', 'INACTIVE', 'GRADUATED'], example: 'ACTIVE' },
          },
        },
        CreateTeacherRequest: {
          type: 'object',
          required: ['fullName', 'phone', 'directionId', 'experience'],
          properties: {
            fullName: { type: 'string', example: 'John Smith' },
            phone: { type: 'string', example: '+998901234567' },
            directionId: { type: 'integer', example: 1 },
            experience: { type: 'integer', example: 5, description: 'Years of experience' },
            status: { type: 'string', enum: ['ACTIVE', 'INACTIVE'], example: 'ACTIVE' },
          },
        },
        CreateDirectionRequest: {
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string', example: 'Frontend' },
            description: { type: 'string', example: 'Web frontend development courses' },
            status: { type: 'string', enum: ['ACTIVE', 'INACTIVE'], example: 'ACTIVE' },
          },
        },
        CreateGroupRequest: {
          type: 'object',
          required: ['name', 'directionId', 'teacherId', 'startDate', 'lessonDays', 'startTime'],
          properties: {
            name: { type: 'string', example: 'Frontend Morning A' },
            directionId: { type: 'integer', example: 1 },
            teacherId: { type: 'integer', example: 1 },
            startDate: { type: 'string', format: 'date', example: '2025-01-15' },
            lessonDays: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'],
              },
              example: ['MONDAY', 'WEDNESDAY', 'FRIDAY'],
            },
            startTime: { type: 'string', example: '09:00' },
            status: { type: 'string', enum: ['ACTIVE', 'INACTIVE', 'COMPLETED'], example: 'ACTIVE' },
          },
        },
        AddStudentToGroupRequest: {
          type: 'object',
          required: ['studentId'],
          properties: {
            studentId: { type: 'integer', example: 1 },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/docs/swaggerDocs.js'],
};

const baseSpec = swaggerJsdoc(options);

export const getSwaggerSpec = (req) => {
  const protocol = req.protocol;
  const host = req.get('host');
  const serverUrl = host ? `${protocol}://${host}` : baseSpec.servers?.[0]?.url;

  return {
    ...baseSpec,
    servers: [{ url: serverUrl, description: 'Current server' }],
  };
};

export const swaggerSpec = baseSpec;
