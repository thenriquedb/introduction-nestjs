import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CheckoutsModule } from './checkouts/checkouts.module';
import { Checkout } from './checkouts/entities/checkout.entity';
import { CheckoutItem } from './checkouts/entities/checkout-item.entity';
import { CheckoutProduct } from './checkouts/entities/checkout-product.entity';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    CheckoutsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nestjs',
      entities: [Checkout, CheckoutItem, CheckoutProduct],
      synchronize: true,
    }),
    RabbitMQModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
