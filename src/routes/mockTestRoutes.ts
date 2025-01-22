import { Router } from 'express';
import { MockTestController } from '../controllers/mockTestController';

const router = Router();
const controller = new MockTestController();

router.post('/create', controller.createTest);
router.post('/submit', controller.submitTest);

export default router; 