import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestController } from './test/test.controller';
import { DatabaseService } from './database/database.service';
import { TweetsModule } from './tweets/tweets.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { join } from 'path';
import { ScheduleModule } from '@nestjs/schedule';
import { EventsModule } from './events/events.module';
import { Event } from './events/entities/events.entity';
// os modulos no nest são 'pedaços', que se combina
// com os outros modulos e forma a aplicação
// também pode ser reusado e transportado facilmente para outras aplicações
// é esse arquivo que configura o restante da aplicação
@Module({
  imports: [
    ScheduleModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      host: join(__dirname, 'database.sqLite'),
      autoLoadModels: true,
      synchronize: true,
      models: [Event],
    }),
    TweetsModule,
    EventsModule,
  ],
  // na controller é onde se registra as rotas
  controllers: [AppController, TestController],
  // provider é o serviço
  providers: [AppService, DatabaseService],
})
export class AppModule {}
