import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TaskDocument } from 'src/mongo/schemas/task.schema';
import {
  TaskNotification,
  TaskNotificationDocument,
} from 'src/mongo/schemas/task_notification.schema';

@Injectable()
export class TaskNotificationRepository {
  constructor(
    @InjectModel(TaskNotification.name)
    private taskActivityModel: Model<TaskNotificationDocument>,
  ) {}

  public async create(
    task: TaskDocument,
    type: string,
  ): Promise<TaskNotificationDocument> {
    const createdItem = new this.taskActivityModel({
      task: task,
      type,
    });
    return await createdItem.save();
  }
}
