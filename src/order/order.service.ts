import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StripeService } from '../common/services/stripe.service';
import { Order, OrderDocument } from '../database/schemas/order.schema';
import { CreateOrderDto } from './dtos/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private bookModel: Model<OrderDocument>,
    private stripeService: StripeService,
  ) {}

  async getPaymentLink(orderId: string) {
    const order = await this.bookModel.findOne({ _id: orderId });
    if (order) {
      return await this.stripeService.createPaymentLink({
        quantity: order.quantity,
        priceId: order.priceId,
      });
    }
  }

  async createOrder(data: CreateOrderDto) {
    const order = await this.bookModel.create(data);
    return await order.save();
  }
}
