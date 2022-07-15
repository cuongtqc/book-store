import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Category } from './category.schema';

export type BookDocument = Book & Document;

@Schema()
export class Book {
  @Prop()
  name: string;

  @Prop()
  categoryId: string;

  @Prop()
  price: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);
