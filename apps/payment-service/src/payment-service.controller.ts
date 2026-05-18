import { Controller, Get, Inject } from '@nestjs/common';
import { PaymentServiceService } from './payment-service.service';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class PaymentServiceController {
  constructor(
    private readonly paymentServiceService: PaymentServiceService,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  @Get()
  getHello(): string {
    return this.paymentServiceService.getHello();
  }

  @MessagePattern('process-payment')
  handleProcessPayment(@Payload() data: any) {
    console.log('[Payment-Service]: Processing payment for order:', data);
    // Simulate payment processing logic here

    this.kafkaClient.emit('payment-processed', data);
  }
}
