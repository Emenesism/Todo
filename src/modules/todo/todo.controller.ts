import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TodoService } from './todo.service';

import { CreateTodoDTO } from './dto/create-todo.dto';
import { TodoRepositoryResponse } from './interface/repositoryResponse';
import { AuthenticatedRequest } from './interface/request';
import { AuthGuard } from 'src/common/gaurd/auth.gaurd';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @UseGuards(AuthGuard)
  async createTodo(
    @Body() createTodoDto: CreateTodoDTO,
    @Req() req: AuthenticatedRequest,
  ): Promise<TodoRepositoryResponse> {
    const userId = req.user.userId;
    return this.todoService.createTodo({
      ...createTodoDto,
      userId: userId,
    });
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getTodoById(
    @Param('id') id: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<TodoRepositoryResponse> {
    const userId = req.user.userId;
    return this.todoService.getTodoById(id, userId);
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAllTodosByUserAndStatus(
    @Query('isDone') isDone: boolean,
    @Req() req: AuthenticatedRequest,
  ): Promise<TodoRepositoryResponse> {
    const userId = req.user.userId;
    return this.todoService.getAllTodosByUserAndStatus(userId);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async updateTodo(
    @Param('id') id: string,
    @Body() updateTodoDto: Partial<CreateTodoDTO>,
    @Req() req: AuthenticatedRequest,
  ): Promise<TodoRepositoryResponse> {
    const userId = req.user.userId;
    return this.todoService.updateTodo(id, userId, updateTodoDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteTodo(
    @Param('id') id: string,
    @Req() req: AuthenticatedRequest,
  ): Promise<TodoRepositoryResponse> {
    const userId = req.user.userId;
    return this.todoService.deleteTodo(id, userId);
  }
}
