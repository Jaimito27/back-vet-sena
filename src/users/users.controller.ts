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

  @Get(':ident_document')
  getOnlyUser(
    @Param('ident_document') ident_document: string,
  ) {

    return this.usersService.getOnlyUser(ident_document);
  }

  @Patch(':ident_document')
  async updateUser(
    @Param('ident_document') ident_document: string,
    @Body() user: UpdateUserDto,
  ) {
    return await this.usersService.updateUser(ident_document, user);
  }

  @Delete(':ident_document')
  removeUser(@Param('ident_document') ident_document: string) {
    return this.usersService.removeUser(ident_document);
  }
}
