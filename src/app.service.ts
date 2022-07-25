import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
// esse injectable permite utilizar o AppService sem precisar de um new, é só importar
// diretamente e usar
export class AppService {
  constructor(private sequelize: Sequelize) {}
  getHello(): string {
    return 'Kalliu gostosão';
  }
}
