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

    if (!userFound) {
      return new HttpException('Credenciales inválidas', HttpStatus.NOT_FOUND);
    } else if (userFound instanceof HttpException) {
      return userFound;
    }

    const isPasswordValid = await bcryptjs.compare(
      password,
      userFound.password,
    );

    if (!isPasswordValid) {
      return new HttpException('Contraseña inválida', HttpStatus.NOT_FOUND);
    }

    if (userFound.state === false) {
      return new HttpException(
        'El usuario al cual intenta acceder, está bloqueado',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const patyload = { username: userFound.username, role: userFound.role };
    const token = await this.jwtService.signAsync(patyload);

    return {
      token,

      doc_type: userFound.doc_type,
      ident_document: userFound.ident_document,
      names: userFound.names,
      last_name: userFound.last_name,
      phone: userFound.phone,

      email: userFound.email,

      creation_date: userFound.creation_date,
      role: userFound.role,
    };
  }
}
