import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from '../database/schemas/category.schema';
import { Order, OrderSchema } from '../database/schemas/order.schema';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
