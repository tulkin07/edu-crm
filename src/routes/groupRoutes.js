import { Router } from 'express';
import * as groupController from '../controllers/groupController.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = Router();

router.use(authenticate);

router.get('/', authorize('ADMIN', 'RECEPTION', 'TEACHER', 'STUDENT'), groupController.getAll);
router.get('/:id', authorize('ADMIN', 'RECEPTION', 'TEACHER', 'STUDENT'), groupController.getById);
router.post('/', authorize('ADMIN'), groupController.create);
router.patch('/:id', authorize('ADMIN'), groupController.update);
router.delete('/:id', authorize('ADMIN'), groupController.remove);
router.post('/:id/students', authorize('ADMIN', 'RECEPTION'), groupController.addStudent);
router.delete('/:id/students/:studentId', authorize('ADMIN', 'RECEPTION'), groupController.removeStudent);

export default router;
