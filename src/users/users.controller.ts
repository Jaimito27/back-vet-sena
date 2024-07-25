import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise <User> {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  getUsers(): Promise <User[]> {
    return this.usersService.getUsers();
  }

  @Get(':ident_document')
  getOnlyUser(@Param('ident_document', ParseIntPipe) ident_document: number): Promise <User> {
    return this.usersService.getOnlyUser(+ident_document);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto){
    return await this.usersService.update(+id, updateUserDto);
  }

  @Delete(':ident_document')
  removeUser(@Param('ident_document', ParseIntPipe) ident_document: number) {
    return this.usersService.removeUser(+ident_document);
  }
}
