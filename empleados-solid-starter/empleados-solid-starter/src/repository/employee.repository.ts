import { Employee, EmployeeData } from '../models/employee.model.js';

export interface EmployeeRepository {
  create(data: EmployeeData): Promise<EmployeeData>;
  findAll(): Promise<EmployeeData[]>;
  findById(id: string): Promise<EmployeeData | null>;
}

export class MongoEmployeeRepository implements EmployeeRepository {
  async create(data: EmployeeData) {
    return Employee.create(data);
  }

  async findAll() {
    return Employee.find().sort({ createdAt: -1 });
  }

  async findById(id: string) {
    return Employee.findById(id);
  }
}
