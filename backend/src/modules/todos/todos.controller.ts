import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodoStoreDto } from './dto/todo-store.dto';
import { TodoUpdateDto } from './dto/todo-update.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  async index(
    @Query() query: { page?: string; limit?: string; search?: string },
  ) {
    const page = query.page ? parseInt(query.page) : 1;
    const limit = query.limit ? parseInt(query.limit) : 20;
    const skip = (page - 1) * limit;

    return await this.todosService.findAll({
      skip,
      take: limit,
      search: query.search,
    });
  }

  @Post()
  async store(@Body() data: TodoStoreDto) {
    return await this.todosService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: TodoUpdateDto) {
    return await this.todosService.update(parseInt(id), data);
  }
}
