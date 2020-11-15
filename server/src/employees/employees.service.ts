import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee as EmployeeEntity } from './employee.entity';
import { Employee } from './employee.interface';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private employeesRepository: Repository<Employee>,
  ) {}

  async findAll(): Promise<Employee[]> {
    return this.employeesRepository.find();
  }
  async findOne(id: string): Promise<Employee> {
    return this.employeesRepository.findOne(id);
  }
  async create(employee: Employee) {
    return this.employeesRepository.save(employee);
  }
  async update(id: number, employee: Employee) {
    return this.employeesRepository.save({ ...employee, id: Number(id) });
  }
  async remove(id: string): Promise<void> {
    await this.employeesRepository.delete(id);
  }
}
