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
    servers: [{ url: `http://localhost:${config.port}`, description: 'Development server' }],
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
        Student: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            fullName: { type: 'string' },
            phone: { type: 'string' },
            birthDate: { type: 'string', format: 'date-time' },
            gender: { type: 'string', enum: ['MALE', 'FEMALE'] },
            directionId: { type: 'integer' },
            level: { type: 'string' },
            status: { type: 'string', enum: ['ACTIVE', 'INACTIVE', 'GRADUATED'] },
          },
        },
        Teacher: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            fullName: { type: 'string' },
            phone: { type: 'string' },
            directionId: { type: 'integer' },
            experience: { type: 'integer' },
            status: { type: 'string', enum: ['ACTIVE', 'INACTIVE'] },
          },
        },
        Direction: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            description: { type: 'string' },
            status: { type: 'string', enum: ['ACTIVE', 'INACTIVE'] },
          },
        },
        Group: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
            directionId: { type: 'integer' },
            teacherId: { type: 'integer' },
            startDate: { type: 'string', format: 'date-time' },
            lessonDays: { type: 'array', items: { type: 'string' } },
            startTime: { type: 'string' },
            status: { type: 'string', enum: ['ACTIVE', 'INACTIVE', 'COMPLETED'] },
          },
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ['./src/docs/swaggerDocs.js'],
};

export const swaggerSpec = swaggerJsdoc(options);
