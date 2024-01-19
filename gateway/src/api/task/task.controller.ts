import { BadRequestException } from '@nestjs/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TaskRequestDto } from '../dto/task.dto';
import { AuthGuard } from '../guards/auth.guard';
import { TaskService } from './task.service';

@Controller('task')
@ApiTags('task')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class TaskController {
  constructor(private service: TaskService) {}

  @Get(':todoId/:id')
  @ApiOperation({ summary: 'Get task by ID' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'The record was not found.' })
  async get(@Param('todoId') todoId: string, @Param('id') id: string) {
    return await this.service.get(todoId, id);
  }

  @Get(':todoId')
  @ApiOperation({ summary: 'Get tasks for todo ID' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'The record was not found.' })
  async getByTodo(@Param('todoId') id: string) {
    return await this.service.getByTodo(id);
  }

  @Post(':todoId')
  @ApiOperation({ summary: 'Create task' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid request.' })
  async create(@Param('todoId') todoId: string, @Body() task: TaskRequestDto) {
    // Validation
    const startDate = new Date(task.startDate);
    const dueDate = new Date(task.dueDate);

    if (!(startDate instanceof Date || dueDate instanceof Date)) {
      throw new BadRequestException('The dates are invalid');
    }

    if (dueDate < startDate) {
      throw new BadRequestException('End date should be greater then start');
    }

    return await this.service.create(todoId, task);
  }

  @Put(':todoId/:id')
  @ApiOperation({ summary: 'Update task' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'The record was not found.' })
  async update(
    @Param('todoId') todoId: string,
    @Param('id') id: string,
    @Body() task: TaskRequestDto,
  ) {
    return await this.service.update(todoId, id, task);
  }

  @Delete(':todoId/:id')
  @ApiOperation({ summary: 'Delete task by ID' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'The record was not found.' })
  async delete(@Param('todoId') todoId: string, @Param('id') id: string) {
    return await this.service.delete(todoId, id);
  }
}
