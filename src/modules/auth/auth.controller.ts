import { Controller, Post, Body, Get, Render } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from '../user/dto/login.dto';
import { ResponseData } from '@/common/classes/global-class';
import { HttpMessage, HttpStatus } from '@/common/enums/global.emun';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //View
  @Get('loginView-form')
  @Render('auth/auth-login')
  getLoginForm() {
    return {};
  }

  @Post('loginView')
  async loginView(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const result = await this.authService.login(dto);
    return new ResponseData(result, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
  }
}

