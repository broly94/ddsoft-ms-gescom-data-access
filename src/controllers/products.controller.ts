import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from '../services/products.service';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: 'get_products' })
  getSimulatedProducts(@Payload() data: any) {
    console.log(
      'Controlador gescom-data-access: Petición recibida para obtener productos.',
      data,
    );
    return this.productsService.findAll();
  }
}
