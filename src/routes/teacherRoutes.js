import { Router } from 'express';
import * as teacherController from '../controllers/teacherController.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = Router();

router.use(authenticate);

router.get('/', authorize('ADMIN', 'RECEPTION', 'TEACHER', 'STUDENT'), teacherController.getAll);
router.get('/:id', authorize('ADMIN', 'RECEPTION', 'TEACHER', 'STUDENT'), teacherController.getById);
router.post('/', authorize('ADMIN'), teacherController.create);
router.patch('/:id', authorize('ADMIN'), teacherController.update);
router.delete('/:id', authorize('ADMIN'), teacherController.remove);

export default router;
