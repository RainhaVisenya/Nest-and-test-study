import { Test, TestingModule } from '@nestjs/testing';
import { AllEventsService } from './all-events.service';

describe('AllEventsService', () => {
  let service: AllEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllEventsService],
    }).compile();

    service = module.get<AllEventsService>(AllEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
