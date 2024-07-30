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
    private readonly loginService: LoginService
  ) {}

  async createEmployee(employee: CreateEmployeeDto) {
    const employeeFound = await this.employeeRepository.findOneBy({
      ident_document: employee.ident_document,
    });

    if(employeeFound){
      return new HttpException('Usuario ya existe', HttpStatus.CONFLICT)
    }

  

    const newLogin = await this.loginService.createLogin({
      username: employee.username,
      password: employee.password
    })

   if(!(newLogin instanceof Login)) return new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR)


    const newEmployee = this.employeeRepository.create(employee)
    newEmployee.login = newLogin;
    return await this.employeeRepository.save(newEmployee)
  }

  async getEmployee() {
    return await this.employeeRepository.find({relations: ['login']});
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return `This action updates a #${id} employee`;
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }
}
