import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEventsDto } from './dto/create-events.dto';
import { UpdateEventsDto } from './dto/update-events.dto';
import { Event } from './entities/events.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event)
    private eventsModel: typeof Event,
  ) {}

  create(createEventsDto: CreateEventsDto) {
    return this.eventsModel.create(createEventsDto as any);
  }

  findAll() {
    return this.eventsModel.findAll();
  }

  findOne(id: number) {
    return this.eventsModel.findOne({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateEventDto: UpdateEventsDto) {
    return this.eventsModel.update(
      { ...updateEventDto },
      {
        where: { id },
      },
    );
  }

  remove(id: number) {
    return this.eventsModel.destroy({
      where: { id },
    });
  }
}
