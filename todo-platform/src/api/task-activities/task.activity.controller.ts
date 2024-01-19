import { Controller, Logger } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TaskHistoryDto } from 'src/api/dto/task.history.dto';
import { UserDto } from 'src/api/dto/user.dto';
import { TaskActivityService } from './task.activity.service';

@Controller()
export class TaskActivityController {
  private readonly logger = new Logger(TaskActivityController.name);
  constructor(private service: TaskActivityService) {}

  @MessagePattern({ cmd: 'task_history' })
  async get(data: { taskId: string }): Promise<TaskHistoryDto[]> {
    this.logger.verbose('Request to get task history received...');
    return await this.service.getByTask(data.taskId);
  }

  @MessagePattern({ cmd: 'start_task' })
  async start(data: {
    taskId: string;
    loggedInUser: UserDto;
  }): Promise<TaskHistoryDto> {
    this.logger.verbose('Request to start task received...');
    return await this.service.start(data.taskId, data.loggedInUser);
  }

  @MessagePattern({ cmd: 'end_task' })
  async end(data: {
    taskId: string;
    id: string;
    loggedInUser: UserDto;
  }): Promise<TaskHistoryDto> {
    this.logger.verbose('Request to end task received...');
    return await this.service.end(data.taskId, data.id, data.loggedInUser);
  }
}
