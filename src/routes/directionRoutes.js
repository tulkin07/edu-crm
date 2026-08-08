import { Router } from 'express';
import * as directionController from '../controllers/directionController.js';
import { authenticate, authorize } from '../middlewares/auth.js';

const router = Router();

router.use(authenticate);

router.get('/', authorize('ADMIN', 'RECEPTION', 'TEACHER', 'STUDENT'), directionController.getAll);
router.get('/:id', authorize('ADMIN', 'RECEPTION', 'TEACHER', 'STUDENT'), directionController.getById);
router.post('/', authorize('ADMIN'), directionController.create);
router.patch('/:id', authorize('ADMIN'), directionController.update);
router.delete('/:id', authorize('ADMIN'), directionController.remove);

export default router;
