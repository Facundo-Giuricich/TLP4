import { Request, Response } from 'express';
import { EmployeeService } from '../services/employee.service.js';

export class EmployeeController {
  constructor(private readonly service: EmployeeService) {}

  create = async (req: Request, res: Response) => {
    const employee = await this.service.createEmployee(req.body);
    console.log(`Empleado creado: ${employee.name} - salario final: ${employee.finalSalary}`);
    res.status(201).json(employee);
  };

  list = async (_req: Request, res: Response) => {
    res.json(await this.service.listEmployees());
  };

  getById = async (req: Request<{ id: string }>, res: Response) => {
    res.json(await this.service.getEmployee(req.params.id));
  };
}
