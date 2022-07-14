import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CommonModule } from './common/common.module';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [DatabaseModule, CommonModule, BookModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
