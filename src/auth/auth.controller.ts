import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthGuard } from './guard/auth.guard';

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

    @Get('profile')
    @UseGuards(AuthGuard)
    profile(@Request() req,){
        return req.user
    }
}
