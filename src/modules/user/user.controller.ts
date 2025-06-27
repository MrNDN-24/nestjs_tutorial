import { Controller, Post, Body, Get, Render } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseData } from '@/common/classes/global-class';
import { HttpStatus, HttpMessage } from '@/common/enums/global.emun';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //View
  @Get('registerView-form')
  @Render('auth/auth-register')
  getRegisterForm() {
    return {};
  }

  @Post('registerView')
  async registerView(@Body() body: CreateUserDto) {
    const user = await this.userService.register(body);
    return { user };
  }

  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    const user = await this.userService.register(dto);
    return new ResponseData(user, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
  }
}
