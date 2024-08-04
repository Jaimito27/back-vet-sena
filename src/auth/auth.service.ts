import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { LoginService } from '../../src/login/login.service';
import * as bcryptjs from 'bcryptjs';;
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../src/users/users.service';
import { EmployeeService } from '../../src/employee/employee.service';
import { User } from '../../src/users/entities/user.entity';
import { Employee } from '../../src/employee/entities/employee.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly loginService: LoginService,
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly employeeService: EmployeeService
) {}

  async login({ username, password}: AuthDto) {
    const userFound = await this.loginService.getUserUsername(username);

    if (!userFound || userFound instanceof HttpException)  return new HttpException('credenciales invalidas', HttpStatus.NOT_FOUND);
     

    const isPasswordValid = await bcryptjs.compare(password, userFound.password);

    if (!isPasswordValid) return new HttpException('Contraseña invalida', HttpStatus.UNAUTHORIZED);

 

    const patyload = {username: userFound.username}
    const token = await this.jwtService.signAsync(patyload)

    return {
        token,
        username: userFound.username
    };
}





}