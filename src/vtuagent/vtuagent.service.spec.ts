import { Test, TestingModule } from '@nestjs/testing';
import { VtuagentService } from './vtuagent.service.js';

describe('VtuagentService', () => {
  let service: VtuagentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VtuagentService],
    }).compile();

    service = module.get<VtuagentService>(VtuagentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
