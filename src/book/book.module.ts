import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Book } from '../database/models/book.entity';
import { AppConfig } from '../common/constants/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../database/models/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Category], AppConfig.DB)],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}
