import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../src/users/users.service';


@Injectable()
export class AuthService {
  constructor(
   
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,

  ) {}

  async login({ username, password }: AuthDto) {
    const userFound = await this.userService.getUserForUsername(username);

    if (!userFound){
      return new HttpException('usuario invalidas', HttpStatus.NOT_FOUND);
    }else if(userFound instanceof HttpException){
      return userFound
    }

    const isPasswordValid = await bcryptjs.compare(
      password,
      userFound.password,
    );

    if(!isPasswordValid){
      return new HttpException('contraseña invalida', HttpStatus.NOT_FOUND);
    }


    const patyload = { username: userFound.username,  role: userFound.role};
    const token = await this.jwtService.signAsync(patyload);

    return {
      token,
      username: userFound.username,
      role: userFound.role
   
    };
  }
}