import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';
import { LoginService } from '../../src/login/login.service';
import { Login } from '../../src/login/entities/login.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    private readonly loginService: LoginService,
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

    const newLogin = await this.loginService.createLogin({
      username: employee.username,
      password: employee.password,
    });

    if (!(newLogin instanceof Login))
      return new HttpException('Ya existe un empleado con este nombre de usuario', HttpStatus.CONFLICT);

    const newEmployee = this.employeeRepository.create(employee);
    newEmployee.login = newLogin;
    return await this.employeeRepository.save(newEmployee);
  }

  async getEmployees() {
    return await this.employeeRepository.find({ relations: ['login'] });
  }

  async getEmployee(ident_document: string) {
    const employeeFound = await this.employeeRepository.findOne({
      where: { ident_document },
      relations: ['login'],
    });

    if (!employeeFound)
      return new HttpException('El empleado no existe', HttpStatus.NOT_FOUND);

    return employeeFound;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  async removeEmployee(ident_document: string) {
    
    const result = await this.employeeRepository.delete({ident_document})
    
    if(result.affected === 0){
      return new HttpException('Usuario no existe', HttpStatus.NOT_FOUND)
    }
    
    return result;
  }
}
