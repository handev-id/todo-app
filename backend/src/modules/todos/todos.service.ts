import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Todo from 'src/database/entities/todo.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  async findAll({
    skip,
    take,
    search,
  }: {
    skip: number;
    take: number;
    search?: string;
  }) {
    const where = search ? { title: Like(`%${search}%`) } : {};

    const [data, total] = await this.todosRepository.findAndCount({
      where,
      skip,
      take,
      order: { created_at: 'DESC' },
    });

    return {
      total,
      data,
    };
  }

  async create(todoData: Partial<Todo>) {
    const todo = this.todosRepository.create({
      ...todoData,
      status: 'created',
    });
    return await this.todosRepository.save(todo);
  }

  async update(id: number, todoData: Partial<Todo>) {
    await this.todosRepository.update(id, todoData);
    return await this.todosRepository.findOneBy({ id });
  }
}
