import { Global, Module } from '@nestjs/common';
import { RabbitMQModule as RabbitMQNestModule } from '@golevelup/nestjs-rabbitmq';

@Global()
@Module({
  imports: [
    RabbitMQNestModule.forRoot(RabbitMQNestModule, {
      uri: 'amqp://admin:admin@localhost:5672',
    })
  ],
  exports: [RabbitMQNestModule]
})
export class RabbitMQModule { }
