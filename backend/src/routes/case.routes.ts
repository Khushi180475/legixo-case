import { Router } from 'express';
import * as caseController from '../controllers/case.controller';
import { validate } from '../middleware/validate';
import { requireAdmin } from '../middleware/requireAdmin';
import { createCaseSchema, updateCaseSchema } from '../validators/case.schema';
import { createTaskSchema } from '../validators/task.schema';
import * as taskController from '../controllers/task.controller';

const router = Router();

router.route('/')
  .post(validate(createCaseSchema), caseController.createCase)
  .get(caseController.getCases);

router.route('/:id')
  .get(caseController.getCase)
  .put(validate(updateCaseSchema), caseController.updateCase)
  .delete(requireAdmin, caseController.deleteCase);

router.route('/:caseId/tasks')
  .post(validate(createTaskSchema), taskController.createTask)
  .get(taskController.getTasks);

export default router;
