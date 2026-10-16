import { NotFoundError, ValidationError } from '../errors/http-errors.js';
import { EmployeeInput } from '../models/employee.model.js';
import { EmployeeRepository } from '../repository/employee.repository.js';
import { calculateFinalSalary } from './salary-calculator.service.js';

export class EmployeeService {
  constructor(private readonly repository: EmployeeRepository) {}

  async createEmployee(input: Partial<EmployeeInput>) {
    const { name, position, baseSalary, yearsOfService } = input;

    if (!name || !position) {
      throw new ValidationError('Nombre y puesto son obligatorios');
    }

    if (typeof baseSalary !== 'number' || baseSalary <= 0) {
      throw new ValidationError('El salario base debe ser mayor a 0');
    }

    if (typeof yearsOfService !== 'number' || yearsOfService < 0 || !Number.isInteger(yearsOfService)) {
      throw new ValidationError('La antigüedad debe ser un entero mayor o igual a 0');
    }

    const finalSalary = calculateFinalSalary(baseSalary, yearsOfService);
    return this.repository.create({ name, position, baseSalary, yearsOfService, finalSalary });
  }

  async listEmployees() {
    return this.repository.findAll();
  }

  async getEmployee(id: string) {
    const employee = await this.repository.findById(id);

    if (!employee) {
      throw new NotFoundError('Empleado no encontrado');
    }

    return employee;
  }
}
