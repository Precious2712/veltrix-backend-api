import { PartialType } from '@nestjs/mapped-types';
import { CreateVtuAgentDto } from './create-vtuagent.dto.js';

export class UpdateVtuAgentDto extends PartialType(CreateVtuAgentDto) {};