import { Model, Types } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from 'src/mongo/schemas/task.schema';
import { TodoDocument } from 'src/mongo/schemas/todo.schema';
import { ITask } from 'src/repositories/model/task';
import { IUser } from 'src/repositories/model/user';

@Injectable()
export class TaskRepository {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  public async findByAll(): Promise<TaskDocument[]> {
    return this.taskModel.find().exec();
  }

  public async findAllByTodo(todoId: string): Promise<TaskDocument[]> {
    return this.taskModel
      .find({ todo_fk: Types.ObjectId(todoId) })
      .sort({ _id: -1 })
      .exec();
  }

  public async findOne(id: string): Promise<TaskDocument> {
    const item = await this.taskModel.findOne({ _id: id }).exec();
    if (!item) {
      throw new NotFoundException();
    }
    return item;
  }

  public async findRecordsPassedDate(
    currentDate: number,
  ): Promise<TaskDocument[]> {
    const item = await this.taskModel
      .find({ dueDate: { $lt: currentDate } })
      .exec();
    return item;
  }

  public async create(
    todoDetails: TodoDocument,
    item: ITask,
    loggedInUser: IUser,
  ): Promise<TaskDocument> {
    const createdItem = new this.taskModel({
      ...item,
      completed: false,
      todo: todoDetails,
      createDate: Date.now(),
      latsUdpatedDate: Date.now(),
      lastUpdatedBy: loggedInUser,
    });
    return await createdItem.save();
  }

  public async update(
    id: string,
    item: ITask,
    loggedInUser: IUser,
  ): Promise<TaskDocument> {
    return await this.taskModel
      .findOneAndUpdate(
        { _id: id },
        {
          ...item,
          latsUdpatedDate: Date.now(),
          lastUpdatedBy: loggedInUser,
        },
      )
      .exec();
  }

  public async delete(id: string, loggedInUser: IUser): Promise<TaskDocument> {
    const item = await this.findOne(id);
    item.active = false;
    item.latsUdpatedDate = Date.now();
    item.lastUpdatedBy = loggedInUser;
    return await this.taskModel.findOneAndUpdate({ _id: id }, item).exec();
  }
}
