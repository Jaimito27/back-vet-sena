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
  findOne(@Param('ident_document', ParseIntPipe) ident_document: number) {
    return this.usersService.getOnlyUser(+ident_document);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise <User> {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
