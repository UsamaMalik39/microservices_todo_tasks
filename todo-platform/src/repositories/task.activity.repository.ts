import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  TaskHistory,
  TaskHistoryDocument,
} from 'src/mongo/schemas/task_history.schema';
import { TaskHistoryDto } from 'src/api/dto/task.history.dto';
import { TaskDocument } from 'src/mongo/schemas/task.schema';
import { IUser } from 'src/repositories/model/user';

@Injectable()
export class TaskActivityRepository {
  constructor(
    @InjectModel(TaskHistory.name)
    private taskHistoryModel: Model<TaskHistoryDocument>,
  ) {}

  public async findAll(): Promise<TaskHistory[]> {
    return this.taskHistoryModel.find().exec();
  }

  public async findOne(id: string): Promise<TaskHistory> {
    const item = await this.taskHistoryModel.findOne({ _id: id }).exec();
    if (!item) {
      throw new NotFoundException();
    }
    return item;
  }

  public async findByTask(task: TaskDocument): Promise<TaskHistoryDocument[]> {
    const history = await this.taskHistoryModel.find({ task: task }).exec();
    if (!history) {
      throw new NotFoundException();
    }
    return history;
  }

  public async create(
    task: TaskDocument,
    item: TaskHistoryDto,
    loggedInUser: IUser,
  ): Promise<TaskHistoryDocument> {
    const createdItem = new this.taskHistoryModel({
      ...item,
      completed: false,
      task: task,
      user: loggedInUser,
    });
    return await createdItem.save();
  }

  public async update(
    id: string,
    item: TaskHistoryDto,
  ): Promise<TaskHistoryDocument> {
    return await this.taskHistoryModel
      .findOneAndUpdate({ _id: id }, item)
      .exec();
  }
}
