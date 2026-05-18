import { Controller, Get, Inject } from '@nestjs/common';
import { OrderServiceService } from './order-service.service';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class OrderServiceController {
  constructor(
    private readonly orderServiceService: OrderServiceService,
    @Inject('KAFKA_SERVICE') private readonly KafkaClient: ClientKafka,
  ) {}

  @Get()
  getHello(): string {
    return this.orderServiceService.getHello();
  }

  @MessagePattern('order-created')
  handleOrderCreated(@Payload() order: any) {
    console.log('[Order-Service]: Received order:', order);
    // Simulate order processing logic here

    this.KafkaClient.emit('process-payment', order);
  }
}
