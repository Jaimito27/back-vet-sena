import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Get('locked')
  getUsersLocked(): Promise<User[]>{
    return this.usersService.getUsersLocked();
  }

  @Get('employee')
  getEmployee(): Promise<User[]> {
    return this.usersService.getEmployee();
  }

  @Get(':id')
  getOnlyUser(@Param('id') id: string) {
    return this.usersService.getOnlyUser(id);
  }

  @Patch('delete/:id')
  blockUser(@Param('id') id: string) {
    return this.usersService.blockUser(id);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return await this.usersService.updateUser(id, user);
  }


}
