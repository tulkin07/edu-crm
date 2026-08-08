import { Router } from 'express';
import * as studentController from '../controllers/studentController.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = Router();

router.use(authenticate);

router.get('/', authorize('ADMIN', 'RECEPTION', 'TEACHER', 'STUDENT'), studentController.getAll);
router.get('/:id', authorize('ADMIN', 'RECEPTION', 'TEACHER', 'STUDENT'), studentController.getById);
router.post('/', authorize('ADMIN', 'RECEPTION'), studentController.create);
router.patch('/:id', authorize('ADMIN', 'RECEPTION'), studentController.update);
router.delete('/:id', authorize('ADMIN', 'RECEPTION'), studentController.remove);

export default router;
