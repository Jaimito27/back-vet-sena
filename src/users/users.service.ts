import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto) {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

 async getUsers() {
    return await this.userRepository.find();
  }

  async getOnlyUser(ident_document: number) {
    return await this.userRepository.findOne({
      where: {
        ident_document
      }
    });
  }

  async updateUser(ident_document: number, user: UpdateUserDto) {
    return await this.userRepository.update({ident_document}, user);
  }

  async removeUser(ident_document: number) {
    return await this.userRepository.delete({ident_document});
  }
}
