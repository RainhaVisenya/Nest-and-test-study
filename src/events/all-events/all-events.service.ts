import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/sequelize';
import { Cache } from 'cache-manager';
import { Event } from '../entities/events.entity';

@Injectable()
export class AllEventsService {
  constructor(
    @InjectModel(Event)
    private eventModel: typeof Event,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  @Interval(5000)
  async allEvents() {
    console.log('procurando os eventos...');
    let offset = await this.cacheManager.get<number>('event-offset');
    offset = offset === undefined ? 0 : offset;

    console.log('todos os eventos: ', offset);
    const events = await this.eventModel.findAll({
      offset,
    });
    const eventsSorted = events.sort(function (a, b) {
      if (a.date > b.date) {
        return 1;
      }
      if (a.date < b.date) {
        return -1;
      }
      return 0;
    });

    console.log(
      'total de eventos: ',
      eventsSorted.filter((e) => e.id),
    );
  }
}
