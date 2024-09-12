import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Todo } from '../entities/todo.entity';
import { CreateTodoDTO } from '../dto/create-todo.dto'; // Adjust the import path as needed
import { AppLoggerService } from 'src/common/utils/logger.service';
import { TodoRepositoryResponse } from '../interface/repositoryResponse';

@Injectable()
export class TodoRepository extends Repository<Todo> {
  constructor(
    private dataSource: DataSource,
    private readonly logger: AppLoggerService,
  ) {
    super(Todo, dataSource.createEntityManager());
  }

  async createTodo(
    createTodoData: CreateTodoDTO,
  ): Promise<TodoRepositoryResponse> {
    try {
      const todo = this.create(createTodoData);
      await this.save(todo);

      this.logger.log('Todo creation is successful');
      return {
        success: true,
        message: 'Successful',
        data: todo,
      };
    } catch (error) {
      this.logger.error('Error occurred during todo creation', error.message);
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async getTodoById(id: string): Promise<TodoRepositoryResponse> {
    try {
      const todo = await this.findOne({ where: { id } });

      if (!todo) {
        this.logger.log(`Todo with ID ${id} not found`);
        return {
          success: false,
          message: 'Todo not found',
        };
      }

      this.logger.log(`Todo with ID ${id} found successfully`);
      return {
        success: true,
        message: 'Successful',
        data: todo,
      };
    } catch (error) {
      this.logger.error(
        `Error occurred while fetching todo with ID ${id}`,
        error.message,
      );
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async getAllTodosByUserAndStatus(
    userId: string,
  ): Promise<TodoRepositoryResponse> {
    try {
      const todos = await this.find({
        where: {
          user: { id: userId },
          isDone: false,
        },
      });

      this.logger.log('Retrieved todos by user and status successfully');
      return {
        success: true,
        message: 'Successful',
        data: todos,
      };
    } catch (error) {
      this.logger.error(
        'Error occurred while fetching todos by user and status',
        error.message,
      );
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async updateTodo(
    id: string,
    updateData: Partial<CreateTodoDTO>,
  ): Promise<TodoRepositoryResponse> {
    try {
      const todo = await this.findOne({ where: { id } });

      if (!todo) {
        this.logger.log(`Todo with ID ${id} not found`);
        return {
          success: false,
          message: 'Todo not found',
        };
      }

      const updatedTodo = await this.save({ ...todo, ...updateData });

      this.logger.log(`Todo with ID ${id} updated successfully`);
      return {
        success: true,
        message: 'Successful',
        data: updatedTodo,
      };
    } catch (error) {
      this.logger.error(
        `Error occurred while updating todo with ID ${id}`,
        error.message,
      );
      return {
        success: false,
        message: error.message,
      };
    }
  }

  async deleteTodo(id: string): Promise<TodoRepositoryResponse> {
    try {
      const todo = await this.findOne({ where: { id } });

      if (!todo) {
        this.logger.log(`Todo with ID ${id} not found`);
        return {
          success: false,
          message: 'Todo not found',
        };
      }

      await this.remove(todo);

      this.logger.log(`Todo with ID ${id} deleted successfully`);
      return {
        success: true,
        message: 'Successful',
      };
    } catch (error) {
      this.logger.error(
        `Error occurred while deleting todo with ID ${id}`,
        error.message,
      );
      return {
        success: false,
        message: error.message,
      };
    }
  }
}
