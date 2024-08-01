import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

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
    login(){
        return this.authService.login()
    }
}
