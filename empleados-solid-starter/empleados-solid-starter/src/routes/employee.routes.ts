import { Router } from 'express';
import { EmployeeController } from '../controllers/employee.controller.js';

export const createEmployeeRoutes = (controller: EmployeeController) => {
  const router = Router();

  router.post('/', controller.create);
  router.get('/', controller.list);
  router.get('/:id', controller.getById);

  return router;
};