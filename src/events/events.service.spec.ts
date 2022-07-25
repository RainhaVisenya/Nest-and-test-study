import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'sequelize-typescript';
import { CreateEventsDto } from './dto/create-events.dto';
import { UpdateEventsDto } from './dto/update-events.dto';
import { Event } from './entities/events.entity';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

describe('EventsService', () => {
  let service: EventsService;
  let eventsRepository: Repository<CreateEventsDto>;

  const eventsList = [
    new CreateEventsDto({ name: 'rolezim', date: '15/02/1998' }),
    new CreateEventsDto({ name: 'rolezim-2', date: '16/03/1998' }),
    new CreateEventsDto({ name: 'rolezim-3', date: '17/04/1998' }),
  ];

  const updateEvent = new UpdateEventsDto({
    name: 'rolezim',
    date: '15/02/1998',
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        EventsService,
        {
          provide: getModelToken(Event),
          useValue: {
            findAll: jest.fn().mockResolvedValue(eventsList),
            findOne: jest.fn().mockResolvedValue(eventsList[0]),
            create: jest.fn().mockReturnValue(eventsList[0]),
            update: jest.fn().mockReturnValue(updateEvent),
            destroy: jest.fn().mockReturnValue(undefined),
          },
        },
      ],
    }).compile();

    service = module.get<EventsService>(EventsService);
    eventsRepository = module.get<Repository<CreateEventsDto>>(
      getModelToken(Event),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(eventsRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all the events successfully', async () => {
      // Act
      const result = await service.findAll();

      //Assert
      expect(result).toEqual(eventsList);
      expect(eventsRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      jest
        .spyOn(eventsRepository, 'findAll')
        .mockRejectedValueOnce(new Error());

      //Assert
      expect(service.findAll()).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return an event successfully', async () => {
      // Act
      const result = await service.findOne(1);

      //Assert
      expect(result).toEqual(eventsList[0]);
      expect(eventsRepository.findOne).toHaveBeenCalledTimes(1);
    });
    it('should throw a not found exception', () => {
      // Arrange
      jest
        .spyOn(eventsRepository, 'findOne')
        .mockRejectedValueOnce(new Error());

      //Assert
      expect(service.findOne(1)).rejects.toThrowError();
      // Dentro do toThrowError da pra por o erro se o endpoint for tratado, q o jest testa ele tbm.
    });
  });

  describe('create', () => {
    it('should create a new event successfully', async () => {
      const data: CreateEventsDto = {
        name: 'rolezim',
        date: '15/02/1998',
      };
      // Act
      const result = await service.create(data);
      // Assert
      expect(result).toEqual(eventsList[0]);
      expect(eventsRepository.create).toHaveBeenCalledTimes(1);
    });
    it('should throw an exception', () => {
      const data: CreateEventsDto = {
        name: 'rolezim',
        date: '15/02/1998',
      };
      // Arrange
      jest.spyOn(eventsRepository, 'create').mockRejectedValueOnce(new Error());

      // Assert
      expect(service.create(data)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update an event successfully', async () => {
      // Arrange
      const data: UpdateEventsDto = {
        name: 'rolezim',
        date: '15/02/1998',
      };

      // Act
      const result = await service.update(1, data);

      // Assert
      expect(result).toEqual(updateEvent);
    });
    it('should throw a not found exception', () => {
      // Arrange
      jest.spyOn(eventsRepository, 'update').mockRejectedValueOnce(new Error());

      const data: UpdateEventsDto = {
        name: 'rolezim',
        date: '15/02/1998',
      };

      // Assert
      expect(service.update(1, data)).rejects.toThrowError();
    });
  });
  describe('delete', () => {
    it('should delete an event successfully', async () => {
      // Act
      const result = await service.remove(1);

      // Assert
      expect(result).toBeUndefined();
      expect(eventsRepository.destroy).toHaveBeenCalledTimes(1);
    });

    it('shoud throw a not found exception', () => {
      // Arrange
      jest
        .spyOn(eventsRepository, 'destroy')
        .mockRejectedValueOnce(new Error());

      // Assert
      expect(service.remove(1)).rejects.toThrowError();
    });
  });
});
