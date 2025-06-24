import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('home')
  @Render('index')
  async getIndex() {
    return await this.appService.getLibraryStats();
  }
}
