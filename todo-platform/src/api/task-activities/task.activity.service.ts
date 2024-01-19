import { Injectable, Logger } from '@nestjs/common';
import { TaskHistoryDto } from 'src/api/dto/task.history.dto';
import { UserDto } from 'src/api/dto/user.dto';
import { PermissionGuard } from 'src/common/permission.guard';
import { TaskStatus } from 'src/repositories/model/status';
import { TaskActivityRepository } from 'src/repositories/task.activity.repository';
import { TaskRepository } from 'src/repositories/task.repository';

@Injectable()
export class TaskActivityService {
  private readonly logger = new Logger(TaskActivityService.name);
  constructor(
    private readonly taskActivityRepository: TaskActivityRepository,
    private readonly taskRepository: TaskRepository,
    private readonly permissionGuard: PermissionGuard,
  ) {}

  public async getByTask(taskId: string): Promise<TaskHistoryDto[]> {
    console.log('60e16e521a042b48d9ac5b22');
    this.logger.verbose('Request to get task history...');
    const task = await this.taskRepository.findOne(taskId);
    this.permissionGuard.isTaskActive(task);
    return await this.taskActivityRepository.findByTask(task);
  }

  public async start(
    taskId: string,
    loggedInUser: UserDto,
  ): Promise<TaskHistoryDto> {
    this.logger.verbose('Request to start task received...');
    const task = await this.taskRepository.findOne(taskId);
    console.log(task);
    this.permissionGuard.isTaskActive(task);

    task.status = TaskStatus.IN_PROGRESS;
    this.taskRepository.update(taskId, task, loggedInUser);

    const taskHistory: TaskHistoryDto = {
      startDate: Date.now(),
      endDate: 0,
      status: TaskStatus.IN_PROGRESS,
    };
    return await this.taskActivityRepository.create(
      task,
      taskHistory,
      loggedInUser,
    );
  }

  public async end(
    taskId: string,
    id: string,
    loggedInUser: UserDto,
  ): Promise<TaskHistoryDto> {
    const task = await this.taskRepository.findOne(taskId);
    this.permissionGuard.isTaskActive(task);

    task.status = TaskStatus.DONE;
    this.taskRepository.update(taskId, task, loggedInUser);
    const taskHistory = await this.taskActivityRepository.findOne(id);
    taskHistory.endDate = Date.now();
    taskHistory.status = TaskStatus.DONE;
    return await this.taskActivityRepository.update(id, taskHistory);
  }
}
