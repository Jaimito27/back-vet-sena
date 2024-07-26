import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

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
          'Ya existe un usuario con esté numero de identificación',
          HttpStatus.CONFLICT,
        );
      }
      if (userFound.username === user.username) {
        return new HttpException(
          'Ya existe un usuario con este nombre de usuario',
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
    return await this.userRepository.find();
  }

  async getOnlyUser(ident_document: string) {
    const userFound =  await this.userRepository.findOne({
      where: {
        ident_document,
      },
    });

    if(!userFound){
      return new HttpException('El usuario no existe', HttpStatus.NOT_FOUND)
    }

    return userFound;
  }

  async updateUser(ident_document: string, user: UpdateUserDto) {


    const userFound = await this.userRepository.findOne({
      where: {
        ident_document
      }
    })

    if(!userFound){
      return new HttpException('Usuario no existe', HttpStatus.NOT_FOUND)
    }

    const updateUser = Object.assign(userFound, user) //une la info tanto de los datos que existian como lo que se está ingresando
    return await this.userRepository.save(updateUser);
  }

  async removeUser(ident_document: string) {
    const result = await this.userRepository.delete({ident_document})

    if(result.affected === 0){
      return new HttpException('El usuario no existe', HttpStatus.NOT_FOUND)
    }
    
    return result;
  }
}
