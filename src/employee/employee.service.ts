import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { LoginService } from '../../src/login/login.service';
import { Login } from '../../src/login/entities/login.entity';

import * as bcryptjs from 'bcryptjs';
import { RoleService } from '../../src/role/role.service';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    private readonly loginService: LoginService,
    private readonly roleService: RoleService,
  ) {}

  async createEmployee(employee: CreateEmployeeDto) {
    const employeeFound = await this.employeeRepository.findOne({
      where: [
        { ident_document: employee.ident_document },
        { email: employee.email },
      ],
    });

    if (employeeFound) {
      if (employeeFound.ident_document === employee.ident_document) {
        return new HttpException(
          'Ya existe un empleado con esta identificación',
          HttpStatus.CONFLICT,
        );
      }
      if (employeeFound.email === employee.email) {
        return new HttpException(
          'Ya existe un empleado con este email',
          HttpStatus.CONFLICT,
        );
      }
    }

    const heshedPassword = await bcryptjs.hash(employee.password, 10);

    const newLogin = await this.loginService.createLogin({
      username: employee.username,
      password: heshedPassword,
    });

    if (!(newLogin instanceof Login))
      return new HttpException(
        'Ya existe un empleado con este nombre de usuario',
        HttpStatus.CONFLICT,
      );

    const newRole = await this.roleService.createNewRole({
      role: employee.role,
    });

    const newEmployee = this.employeeRepository.create({
      ...employee,
      login: newLogin,
      role: newRole
    })

    return await this.employeeRepository.save(newEmployee);
  }

  async getEmployees() {
    return await this.employeeRepository.find({ relations: ['login', 'role'] });
  }

  async getEmployee(id: string) {
    const employeeFound = await this.employeeRepository.findOne({
      where: { id },
      relations: ['login', 'role'],
    });

    if (!employeeFound)
      return new HttpException('El empleado no existe', HttpStatus.NOT_FOUND);

    return employeeFound;
  }

  async updateEmployee(id: string, employee: UpdateEmployeeDto) {
    const employeeFound = await this.employeeRepository.findOne({
      where: { id },
    });

    if (!employeeFound) {
      console.log(employeeFound);
      return new HttpException('Empleado no existe', HttpStatus.NOT_FOUND);
    }

    const employeeUpdate = Object.assign(employeeFound, employee);

    return await this.employeeRepository.save(employeeUpdate);
  }

  async removeEmployee(id: string) {
    const result = await this.employeeRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('Empleado no existe', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
