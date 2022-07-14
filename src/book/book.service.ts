import { Injectable } from '@nestjs/common';
import { Book } from '../database/models/book.entity';
import { CreateBookDto } from './dtos/create-book.dto';
import { Category } from '../database/models/category.entity';
import { AppConfig } from '../common/constants/constants';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, In, Repository } from 'typeorm';
import { ObjectID } from 'mongodb';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book, AppConfig.DB)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Category, AppConfig.DB)
    private readonly categoryRepository: Repository<Category>,
    @InjectEntityManager(AppConfig.DB)
    private readonly entityManager: EntityManager,
  ) {}

  async createBook(data: CreateBookDto): Promise<Book> {
    const book = this.bookRepository.create(data);
    await this.bookRepository.save(book);
    return book;
  }

  async getBooks() {
    const [books, count] = await this.bookRepository.findAndCount();
    // const categoryIds = books.map((book) => book.categoryId);
    const categories = await this.categoryRepository.findBy({
      _id: In([ObjectID('62d0318ad8b6a85a8cf0b42f')]),
    });
    const category = await this.categoryRepository.findOneBy({
      _id: ObjectID('62d0318ad8b6a85a8cf0b42f'),
    });
    console.log('categoryIds', categories);
    console.log('category', category);
    const items = books.map((book) => ({
      ...book,
      category: categories.find((_) => _._id.toString() === book.categoryId),
    }));
    return { items, total: count };
  }
}
