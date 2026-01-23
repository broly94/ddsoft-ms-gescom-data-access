import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DataAccessService } from '../services/data-access.service';

@Controller('data-access')
export class DataAccessController {
  constructor(private readonly dataAccessService: DataAccessService) {}

  @MessagePattern('health-check')
  healthCheck() {
    return { status: 'ok' };
  }

  @MessagePattern({ cmd: 'search_seller' })
  async searchSeller(@Payload() data: { id: string }) {
    return this.dataAccessService.searchSellerByCode(data.id);
  }

  @MessagePattern({ cmd: 'search_client' })
  async searchClient(@Payload() data: { id: string }) {
    return this.dataAccessService.searchClientByCode(data.id);
  }
}
