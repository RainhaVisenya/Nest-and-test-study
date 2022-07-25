import { Module, CacheModule } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Event } from './entities/events.entity';
import { AllEventsService } from './all-events/all-events.service';

// esse módulo utiliza o método forFeature() para definir quais models estão registradas
// no escopo atual. COm isso, é possível injetar a EventModel no EventsService usando
// o decorator @injectModel()
@Module({
  imports: [CacheModule.register(), SequelizeModule.forFeature([Event])],
  controllers: [EventsController],
  providers: [EventsService, AllEventsService],
})
export class EventsModule {}
