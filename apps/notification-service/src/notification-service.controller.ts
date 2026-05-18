import { Controller, Get } from '@nestjs/common';
import { NotificationServiceService } from './notification-service.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class NotificationServiceController {
  constructor(
    private readonly notificationServiceService: NotificationServiceService,
  ) {}

  @Get()
  getHello(): string {
    return this.notificationServiceService.getHello();
  }

  @MessagePattern('payment-succeed')
  sendOrderNotification(@Payload() data: any) {
    console.log('notification Service sending order created email', data)
  }
}
