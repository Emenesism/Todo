import { Injectable } from '@nestjs/common';
import { TodoRepository } from './repositories/todo.repository';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { TodoRepositoryResponse } from './interface/repositoryResponse';

@Injectable()
export class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async createTodo(
    createTodoData: CreateTodoDTO,
  ): Promise<TodoRepositoryResponse> {
    return this.todoRepository.createTodo(createTodoData);
  }

  async getTodoById(
    id: string,
    userId: string,
  ): Promise<TodoRepositoryResponse> {
    const todo = await this.todoRepository.getTodoById(id);

    if (!todo.success) {
      return todo;
    }

    if (userId != todo.data.id) {
      return {
        success: false,
        message: 'This Todo is not belongs to you',
      };
    }

    return todo;
  }

  async getAllTodosByUserAndStatus(
    userId: string,
  ): Promise<TodoRepositoryResponse> {
    return this.todoRepository.getAllTodosByUserAndStatus(userId);
  }

  async updateTodo(
    id: string,
    userId: string,
    updateData: Partial<CreateTodoDTO>,
  ): Promise<TodoRepositoryResponse> {
    const todo = await this.todoRepository.getTodoById(id);

    if (!todo.success) {
      return todo;
    }

    if (userId != todo.data.id) {
      return {
        success: false,
        message: 'This Todo is not belongs to you',
      };
    }
    return this.todoRepository.updateTodo(id, updateData);
  }

  async deleteTodo(id: string, userId): Promise<TodoRepositoryResponse> {
    const todo = await this.todoRepository.getTodoById(id);

    if (!todo.success) {
      return todo;
    }

    if (userId != todo.data.id) {
      return {
        success: false,
        message: 'This Todo is not belongs to you',
      };
    }

    return this.todoRepository.deleteTodo(id);
  }
}
