import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateLoginDto } from './dto/update-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Login } from './entities/login.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LoginService {

  constructor(
    @InjectRepository(Login) private readonly loginRepository: Repository<Login>,
  ){}

  async createLogin(login: CreateLoginDto) {
    
    
    const userNameFound = await this.loginRepository.findOne({where: {username: login.username}})
    
    if(userNameFound) return new HttpException('Ya existe un usuario con ese nombre de usuario', HttpStatus.CONFLICT)
     
      const newLogin = this.loginRepository.create(login)
      return await this.loginRepository.save(newLogin)

    }

  async findAll() {
    return await this.loginRepository.find();
  }

  async getUserUsername(username: string) {
    const userFound = await this.loginRepository.findOne({
      where: {
        username
      },

    })

    if (!userFound) {
      return new HttpException('Usuario no existe', HttpStatus.NOT_FOUND);
    }

    return userFound

  }

  update(id: number, updateLoginDto: UpdateLoginDto) {
    return `This action updates a #${id} login`;
  }

  remove(id: number) {
    return `This action removes a #${id} login`;
  }
}
