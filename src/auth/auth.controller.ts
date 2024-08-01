import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {


    constructor(
        private readonly authService: AuthService
    ){}

    @Post('register')
    register(){
        return 'register'
    }


    @Post('login')
    login(@Body() auth: AuthDto,){
        return this.authService.login(auth)
    }
}
