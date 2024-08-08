import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthGuard } from './guard/auth.guard';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './guard/roles.guard';
import { Role } from './enums/rol.enum';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() auth: AuthDto) {
    return this.authService.login(auth);
  }

  @Get('profile')
  @Auth(Role.USER) //llamo el decorador que iuntegra los demás decoradores y le paso el rol que tiene el permioso
  profile(@Request() req) {
    return req.user;
  }
}
