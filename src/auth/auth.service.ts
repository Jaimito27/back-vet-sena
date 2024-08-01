import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { LoginService } from '../../src/login/login.service';
import * as bcryptjs from 'bcryptjs';
import { Login } from '../../src/login/entities/login.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly loginService: LoginService,
    private readonly jwtService: JwtService
) {}

  async login({ username, password }: AuthDto) {
    const userFound = await this.loginService.getUserUsername(username);

    if (userFound instanceof HttpException) {
      throw userFound;
    }

    if (!userFound)
      return new HttpException('credenciales invalidas', HttpStatus.NOT_FOUND);

    const isPasswordValid = await bcryptjs.compare(
      password,
      userFound.password,
    );

    if (!isPasswordValid)
      return new HttpException('Contraseña invalida', HttpStatus.UNAUTHORIZED);



    const patyload = {username: userFound.username}
    const token = await this.jwtService.signAsync(patyload)

    return {
        token, username
    };
  }
}
