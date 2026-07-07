import { Router } from 'express';
import * as taskController from '../controllers/task.controller';
import { validate } from '../middleware/validate';
import { updateTaskSchema } from '../validators/task.schema';

const router = Router();

router.route('/:id')
  .put(validate(updateTaskSchema), taskController.updateTask)
  .delete(taskController.deleteTask);

router.route('/:id/status')
  .patch(taskController.toggleTaskStatus);

export default router;
