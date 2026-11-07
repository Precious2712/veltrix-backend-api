import { Test, TestingModule } from '@nestjs/testing';
import { VtuagentController } from './vtuagent.controller.js';

describe('VtuagentController', () => {
  let controller: VtuagentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VtuagentController],
    }).compile();

    controller = module.get<VtuagentController>(VtuagentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
