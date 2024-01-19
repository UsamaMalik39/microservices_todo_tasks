import { Injectable } from '@nestjs/common';
import { TaskRequestDto, TaskResponseDto } from 'src/api/dto/task.dto';
import { UserDto } from 'src/api/dto/user.dto';
import { PermissionGuard } from 'src/common/permission.guard';
import { TaskStatus } from 'src/repositories/model/status';
import { ITask } from 'src/repositories/model/task';
import { TaskDocument } from 'src/mongo/schemas/task.schema';
import { TaskHistoryDocument } from 'src/mongo/schemas/task_history.schema';
import { TaskActivityRepository } from 'src/repositories/task.activity.repository';
import { TaskRepository } from 'src/repositories/task.repository';
import { TodoRepository } from 'src/repositories/todo.repository';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly todoRepository: TodoRepository,
    private readonly taskActivityRepository: TaskActivityRepository,
    private readonly permissionGuard: PermissionGuard,
  ) {}

  public async create(
    todoId: string,
    request: TaskRequestDto,
    loggedInUser: UserDto,
  ): Promise<TaskResponseDto> {
    const todoDetails = await this.todoRepository.findOne(todoId);
    this.permissionGuard.hasPermission(todoDetails, loggedInUser);
    const task: ITask = {
      ...request,
      active: true,
      status: 'Not Started',
    };
    const savedToDB = await this.taskRepository.create(
      todoDetails,
      task,
      loggedInUser,
    );
    return {
      ...savedToDB['_doc'],
      totalMinutes: 0,
    };
  }

  public async update(
    todoId: string,
    id: string,
    request: TaskRequestDto,
    loggedInUser: UserDto,
  ): Promise<TaskResponseDto> {
    const todoDetails = await this.todoRepository.findOne(todoId);
    const dbRecord = await this.taskRepository.findOne(id);

    this.permissionGuard.hasPermission(todoDetails, loggedInUser);
    const task: ITask = {
      ...request,
      active: dbRecord.active,
      status: dbRecord.status,
    };
    const savedToDB = await this.taskRepository.update(id, task, loggedInUser);
    return {
      ...savedToDB['_doc'],
      totalMinutes: 0,
    };
  }

  public async getByTodo(
    todoId: string,
    loggedInUser: UserDto,
  ): Promise<TaskResponseDto[]> {
    const todoDetails = await this.todoRepository.findOne(todoId);
    this.permissionGuard.hasPermission(todoDetails, loggedInUser);
    this.permissionGuard.isTodoActive(todoDetails);
    const response: TaskResponseDto[] = [];
    const recordsFromDB = await this.taskRepository.findAllByTodo(todoId);
    for (const recordFromDB of recordsFromDB) {
      response.push({
        ...recordFromDB['_doc'],
        totalMinutes: await this.geHoursSpent(recordFromDB),
      });
    }
    return response;
  }

  public async get(
    todoId: string,
    id: string,
    loggedInUser: UserDto,
  ): Promise<TaskResponseDto> {
    const todoDetails = await this.todoRepository.findOne(todoId);
    this.permissionGuard.hasPermission(todoDetails, loggedInUser);
    this.permissionGuard.isTodoActive(todoDetails);
    const recordsFromDB = await this.taskRepository.findOne(id);
    return {
      ...recordsFromDB['_doc'],
      totalMinutes: await this.geHoursSpent(recordsFromDB),
    };
  }

  public async delete(
    todoId: string,
    id: string,
    loggedInUser: UserDto,
  ): Promise<TaskResponseDto> {
    const todoDetails = await this.todoRepository.findOne(todoId);
    this.permissionGuard.hasOwnerPermission(todoDetails, loggedInUser);
    this.permissionGuard.isTodoActive(todoDetails);
    const savedToDB = await this.taskRepository.delete(id, loggedInUser);
    return {
      ...savedToDB['_doc'],
      totalMinutes: await this.geHoursSpent(savedToDB),
    };
  }

  private async geHoursSpent(record: TaskDocument): Promise<number> {
    let totalMinutes = 0;
    const dbActivityRecords = await this.taskActivityRepository.findByTask(
      record,
    );
    dbActivityRecords.forEach((activity: TaskHistoryDocument) => {
      if (activity.status == TaskStatus.DONE) {
        totalMinutes +=
          new Date(activity.endDate).getMinutes() -
          new Date(activity.startDate).getMinutes();
      }
      if (activity.status == TaskStatus.IN_PROGRESS) {
        totalMinutes +=
          new Date().getMinutes() - new Date(activity.startDate).getMinutes();
      }
    });
    return totalMinutes;
  }
}
