import assert from 'node:assert/strict';
import test from 'node:test';
import { NotFoundError, ValidationError } from '../src/errors/http-errors.js';
import { EmployeeData } from '../src/models/employee.model.js';
import { EmployeeRepository } from '../src/repository/employee.repository.js';
import { EmployeeService } from '../src/services/employee.service.js';

class FakeEmployeeRepository implements EmployeeRepository {
  employees: (EmployeeData & { id: string })[] = [];

  async create(data: EmployeeData) {
    const employee = { ...data, id: String(this.employees.length + 1) };
    this.employees.push(employee);
    return employee;
  }

  async findAll() {
    return this.employees;
  }

  async findById(id: string) {
    return this.employees.find((employee) => employee.id === id) ?? null;
  }
}

test('calcula el salario final (ejemplo del README)', async () => {
  const service = new EmployeeService(new FakeEmployeeRepository());
  const employee = await service.createEmployee({
    name: 'Ana',
    position: 'Analista',
    baseSalary: 1_000_000,
    yearsOfService: 5
  });

  assert.equal(employee.finalSalary, 1_100_000);
});

test('usa la misma fórmula que el original (sin diferencias de redondeo)', async () => {
  const service = new EmployeeService(new FakeEmployeeRepository());
  const employee = await service.createEmployee({ name: 'A', position: 'B', baseSalary: 1000, yearsOfService: 7 });

  assert.equal(employee.finalSalary, 1140);
});

test('rechaza datos inválidos', async () => {
  const service = new EmployeeService(new FakeEmployeeRepository());

  await assert.rejects(service.createEmployee({ position: 'Dev', baseSalary: 100, yearsOfService: 1 }), ValidationError);
  await assert.rejects(service.createEmployee({ name: 'A', position: 'Dev', baseSalary: 0, yearsOfService: 1 }), ValidationError);
  await assert.rejects(service.createEmployee({ name: 'A', position: 'Dev', baseSalary: 100, yearsOfService: 1.5 }), ValidationError);
});

test('lanza NotFoundError si el empleado no existe', async () => {
  const service = new EmployeeService(new FakeEmployeeRepository());

  await assert.rejects(service.getEmployee('999'), NotFoundError);
});
