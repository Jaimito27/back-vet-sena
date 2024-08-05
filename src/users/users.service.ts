import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';


import * as bcryptjs from 'bcryptjs';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,


  ) {}

  async createUser(user: CreateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: [{ ident_document: user.ident_document }, { email: user.email }],
    });

    if (userFound) {
      if (userFound.ident_document === user.ident_document) {
        return new HttpException(
          'Ya existe un usuario con esté numero de identificación',
          HttpStatus.CONFLICT,
        );
      }

      if (userFound.email === user.email) {
        return new HttpException(
          'Ya exuste un usuario con este correo',
          HttpStatus.CONFLICT,
        );
      }
    }





    const newUser = this.userRepository.create(user);
  

    return await this.userRepository.save(newUser);
  }

  async getUsers() {
    return await this.userRepository.find({ relations: ['pets', 'login'] });
  }

  async getOnlyUser(id: string) {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: ['pets', 'login'],
    });

    if (!userFound) {
      return new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
    }

    return userFound;
  }




  async updateUser(id: string, user: UpdateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!userFound) {
      return new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
    }

    const updateUser = Object.assign(userFound, user); //une la info tanto de los datos que existian como lo que se está ingresando
    return await this.userRepository.save(updateUser);
  }

  async removeUser(id: string) {
    const result = await this.userRepository.delete({ id });

    if (result.affected === 0) {
      return new HttpException('El usuario no existe', HttpStatus.NOT_FOUND);
    }

    return result;
  }
}
