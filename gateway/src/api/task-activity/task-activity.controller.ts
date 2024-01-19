import {
  Controller,
  Get,
  Logger,
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
import { AuthGuard } from '../guards/auth.guard';
import { TaskActivityService } from './task-activity.service';

@Controller('task/activity')
@ApiTags('task activities')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class TaskActivityController {
  private readonly logger = new Logger(TaskActivityController.name);
  constructor(private service: TaskActivityService) {}

  // @Get(':taskId')
  // @ApiOperation({ summary: 'Get task history based on ID' })
  // @ApiResponse({ status: 200, description: 'The record has been successfully retrieved.' })
  // @ApiResponse({ status: 404, description: 'The record was not found.' })
  // async getByTask(@Param('taskId') taskId: string) {
  //   this.logger.verbose('Request to get task history...')
  //   this.service.getByTask(taskId);
  // }

  @Post('start/:taskId')
  @ApiOperation({ summary: 'Start task' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid request.' })
  async create(@Param('taskId') taskId: string) {
    this.logger.verbose('Request to start task...');
    return this.service.start(taskId);
  }

  @Put('end/:taskId/:id')
  @ApiOperation({ summary: 'End task' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'The record was not found.' })
  async update(@Param('taskId') taskId: string, @Param('id') id: string) {
    this.logger.verbose('Request to end task...');
    return this.service.end(taskId, id);
  }
}
