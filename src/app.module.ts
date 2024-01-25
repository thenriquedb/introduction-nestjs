import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CheckoutModule } from './checkout/checkout.module';
import { CheckoutsModule } from './checkouts/checkouts.module';

@Module({
  imports: [CheckoutModule, CheckoutsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
