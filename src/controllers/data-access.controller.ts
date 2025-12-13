import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('data-access')
export class DataAccessController {
  @MessagePattern('health-check')
  healthCheck() {
    return { status: 'ok' };
  }
}
