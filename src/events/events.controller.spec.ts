import { Test, TestingModule } from '@nestjs/testing';
import { CreateEventsDto } from './dto/create-events.dto';
import { UpdateEventsDto } from './dto/update-events.dto';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

describe('EventsController', () => {
  let controller: EventsController;
  let service: EventsService;

  const eventsList: CreateEventsDto[] = [
    new CreateEventsDto({ name: 'saidão iFut', date: '12/12/2002' }),
    new CreateEventsDto({ name: 'saidão zrp', date: '11/11/2001' }),
    new CreateEventsDto({ name: 'saidão Probono', date: '10/10/2000' }),
  ];

  const events = new CreateEventsDto({ name: 'rolezim', date: '15/02/1998' });

  const newCreateEvents = new CreateEventsDto({
    name: 'new-event',
    date: '01/01/2001',
  });

  const updatedEvents = new CreateEventsDto({
    name: 'update-event',
    date: '02/02/2002',
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        {
          provide: EventsService,
          useValue: {
            create: jest.fn().mockResolvedValue(newCreateEvents),
            findAll: jest.fn().mockResolvedValue(eventsList),
            findOne: jest.fn().mockResolvedValue(events),
            update: jest.fn().mockResolvedValue(updatedEvents),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<EventsController>(EventsController);
    service = module.get<EventsService>(EventsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('get', () => {
    it('should return all the events', async () => {
      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual(eventsList);
      expect(typeof result).toEqual('object');
    });
    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());

      // Assert
      expect(controller.findAll()).rejects.toThrowError();
    });
  });

  describe('get one', () => {
    it('should return all the events', async () => {
      // Act
      const result = await controller.findOne('1');

      // Assert
      expect(result).toEqual(events);
      expect(typeof result).toEqual('object');
    });
    it('should throw an exception', () => {
      // Arrange
      jest.spyOn(service, 'findOne').mockRejectedValueOnce(new Error());

      // Assert
      expect(controller.findOne('1')).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should create a new event successfully', async () => {
      // Arrange
      const body: CreateEventsDto = {
        name: 'new-event',
        date: '01/01/2001',
      };
      // Act
      const result = await controller.create(body);

      //Assert
      expect(result).toEqual(newCreateEvents);
    });

    it('shoud throw an exception', () => {
      // Arrange
      const body: CreateEventsDto = {
        name: 'new-event',
        date: '01/01/2001',
      };

      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());

      //Assert
      expect(controller.create(body)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update a new event successfully', async () => {
      // Arrange
      const body: UpdateEventsDto = {
        name: 'update-event',
        date: '02/02/2002',
      };
      // Act
      const result = await controller.update('1', body);

      // Assert
      expect(result).toEqual(updatedEvents);
      expect(service.update).toHaveBeenCalledWith(1, body);
    });

    it('should throw an exception', () => {
      // Arrange
      const body: UpdateEventsDto = {
        name: 'update-event',
        date: '02/02/2002',
      };
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());

      // Assert

      expect(controller.update('1', body)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should remove an event successfullyh', async () => {
      // Act

      const result = await controller.remove('1');

      // Assert
      expect(result).toBeUndefined();
    });
    it('should throw an exception', () => {
      jest.spyOn(service, 'remove').mockRejectedValueOnce(new Error());

      expect(controller.remove('1')).rejects.toThrowError();
    });
  });
});
