import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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
    type: string,
  ): Promise<TaskNotificationDocument> {
    const createdItem = new this.taskActivityModel({
      type,
    });
    return await createdItem.save();
  }
}
