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

  findAll() {
    return `This action returns all login`;
  }

  findOne(id: number) {
    return `This action returns a #${id} login`;
  }

  update(id: number, updateLoginDto: UpdateLoginDto) {
    return `This action updates a #${id} login`;
  }

  remove(id: number) {
    return `This action removes a #${id} login`;
  }
}
