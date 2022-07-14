import {
  Body,
  Controller,
  Post,
  UsePipes,
  Request,
  ValidationPipe,
  Get,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Book } from '../database/models/book.entity';
import { ApiResult } from '../common/classes/api-result';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/create-category.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ type: Book })
  async create(@Request() request, @Body() data: CreateCategoryDto) {
    const response = await this.categoryService.createCategory(data);
    return new ApiResult().success(response);
  }

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse({ type: Book })
  async get() {
    const response = await this.categoryService.getCategories();
    return new ApiResult().success(response);
  }
}
