import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SellersService } from '@/services/sellers.service';

@Controller()
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @MessagePattern({ cmd: 'get_sellers_by_supervisors' })
  async getSellersBySupervisors(@Payload() data: { supervisorIds: number[] }) {
    console.log(
      `Controlador gescom-data-access: Petición recibida para obtener vendedores por IDs de supervisor: ${data.supervisorIds.join(', ')}`,
    );
    return this.sellersService.findActiveSellersBySupervisorIds(
      data.supervisorIds,
    );
  }
}
