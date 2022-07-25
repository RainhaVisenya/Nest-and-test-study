import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('prefixo')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('test') //acessado pelo /test
  getHello(): string {
    // o getHello está pegando um serviço que é acessado por uma classe em app.service
    return this.appService.getHello();
  }

  @Get('test1') //acessado pelo /test
  action(): string {
    return 'fullcycle';
  }
}
