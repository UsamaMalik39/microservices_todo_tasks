import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TaskRequestDto, TaskResponseDto } from 'src/api/dto/task.dto';
import { UserDto } from 'src/api/dto/user.dto';
import { TaskService } from './task.service';

@Controller()
export class TaskController {
  constructor(private service: TaskService) {}

  @MessagePattern({ cmd: 'get_task' })
  async get(data: { todoId: string; id: string; loggedInUser: UserDto }) {
    return await this.service.get(data.todoId, data.id, data.loggedInUser);
  }

  @MessagePattern({ cmd: 'get_task_by_todo' })
  async getByTodo(data: { todoId: string; loggedInUser: UserDto }) {
    return await this.service.getByTodo(data.todoId, data.loggedInUser);
  }

  @MessagePattern({ cmd: 'create_task' })
  async create(data: {
    todoId: string;
    task: TaskRequestDto;
    loggedInUser: UserDto;
  }) {
    return await this.service.create(data.todoId, data.task, data.loggedInUser);
  }

  @MessagePattern({ cmd: 'update_task' })
  async update(data: {
    todoId: string;
    id: string;
    task: TaskRequestDto;
    loggedInUser: UserDto;
  }) {
    return await this.service.update(
      data.todoId,
      data.id,
      data.task,
      data.loggedInUser,
    );
  }

  @MessagePattern({ cmd: 'delete_task' })
  async delete(data: {
    todoId: string;
    id: string;
    loggedInUser: UserDto;
  }): Promise<TaskResponseDto> {
    return await this.service.delete(data.todoId, data.id, data.loggedInUser);
  }
}
