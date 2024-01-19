import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { AuthGuard } from '../guards/auth.guard';
import { TodoRequestDto } from '../dto/todo.dto';

@Controller('todo')
@ApiTags('todo')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class TodoController {
  constructor(private service: TodoService) {}

  @Get('')
  @ApiOperation({ summary: 'Get All todo' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'The record was not found.' })
  async getAll() {
    return await this.service.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get todo by ID' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'The record was not found.' })
  async get(@Param('id') id: string) {
    return await this.service.get(id);
  }

  @Post()
  @ApiBody({
    type: TodoRequestDto,
  })
  @ApiOperation({ summary: 'Create Todo list' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid request.' })
  async create(@Body() todo: TodoRequestDto) {
    return await this.service.create(todo);
  }

  @Put(':id')
  @ApiBody({
    type: TodoRequestDto,
  })
  @ApiOperation({ summary: 'Update todo' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'The record was not found.' })
  async update(@Param('id') id: string, @Body() todo: TodoRequestDto) {
    return await this.service.update(id, todo);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete todo by ID' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  @ApiResponse({ status: 404, description: 'The record was not found.' })
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }
}
