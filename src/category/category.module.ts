import { Module } from '@nestjs/common';
import { Book } from '../database/models/book.entity';
import { AppConfig } from '../common/constants/constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../database/models/category.entity';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Category], AppConfig.DB)],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
