import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Not, Repository } from 'typeorm';

import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: [
        { ident_document: user.ident_document },
        { username: user.username },
        { email: user.email },
      ],
    });

    if (userFound) {
      if (userFound.ident_document === user.ident_document) {
        return new HttpException(
          'Ya existe un usuario con ese número de identificación',
          HttpStatus.CONFLICT,
        );
      }
  
      if (userFound.username === user.username) {
        return new HttpException(
          'Ya existe un usuario con ese nombre de usuario',
          HttpStatus.CONFLICT,
        );
      }
  
      if (userFound.email === user.email) {
        return new HttpException(
          'Ya existe un usuario con ese correo electrónico',
          HttpStatus.CONFLICT,
        );
      }
    }

    // Hashear la contraseña antes de guardarla
  const hashedPassword = await bcryptjs.hash(user.password, 10);

  // Crear el nuevo usuario
  const newUser = this.userRepository.create({
    ...user,
    password: hashedPassword,
  });
    return await this.userRepository.save(newUser);
  }

  async getUsers() {
    return await this.userRepository.find({ where: {role: 'user', state: 'active'}, relations: ['pets','pets.appointments'] });
  }

  async getUsersLocked() {
    return await this.userRepository.find({ where: {role: 'user', state: 'locked'}, relations: ['pets','pets.appointments'] });
  }

  async getOnlyUser(id: string) {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: ['pets','pets.appointments'],
    });

    if (!userFound) {
      return new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
    }

    return userFound;
  }

  async getUserForIdentDocument(ident_document: string){
    const userFound = await this.userRepository.findOne({
      where: {
        ident_document
      }
    });

    if (!userFound) {
      return new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
    }

    return userFound;
  }

  async getUserForUsername(username: string){
    const userFound = await this.userRepository.findOne({
      where: {username}
    });

    if(!userFound){
      return new HttpException('Usiario no encontrado', HttpStatus.CONFLICT)
    }

    return userFound
  }

  async getEmployee(){
    return await this.userRepository.find({where: {occupation: Not('none')}})
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

    const userFound = await this.userRepository.findOne({
      where: { id}
    })

    if(!userFound) return new HttpException('Usuaurio no existe', HttpStatus.NOT_FOUND)

    
      userFound.state = 'locked'


    return await this.userRepository.save(userFound);
  }
}
