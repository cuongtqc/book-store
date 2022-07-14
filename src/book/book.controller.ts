import {
  Body,
  Controller,
  Post,
  UsePipes,
  Request,
  ValidationPipe,
  Get,
} from '@nestjs/common';
import { BookService } from './book.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Book } from '../database/models/book.entity';
import { ApiResult } from '../common/classes/api-result';
import { CreateBookDto } from './dtos/create-book.dto';

@ApiTags('Book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ type: Book })
  async create(@Request() request, @Body() data: CreateBookDto) {
    const response = await this.bookService.createBook(data);
    return new ApiResult().success(response);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ type: Book })
  async getBooks() {
    const response = await this.bookService.getBooks();
    return new ApiResult().success(response);
  }
}
