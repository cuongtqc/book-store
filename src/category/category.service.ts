import { Injectable } from '@nestjs/common';
import { Book } from '../database/models/book.entity';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { Category } from '../database/models/category.entity';
import { AppConfig } from '../common/constants/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Book, AppConfig.DB)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Category, AppConfig.DB)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async createCategory(data: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(data);
    await this.categoryRepository.save(category);
    return category;
  }

  async getCategories() {
    const [categories, count] = await this.categoryRepository.findAndCount();
    return { items: categories, total: count };
  }
}
