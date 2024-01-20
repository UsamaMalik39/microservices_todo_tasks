import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from 'src/mongo/schemas/todo.schema';
import { TodoDto } from 'src/api/dto/todo.dto';
import { IUser } from 'src/repositories/model/user';
import * as moment from 'moment';
@Injectable()
export class TodoRepository {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  public async findAll(): Promise<TodoDocument[]> {
    return this.todoModel.find().exec();
  }

  public async findDoneTasksOverMonth(): Promise<TodoDocument[]> {
    const oneMonthAgo = moment().subtract(1, 'months').toDate();
    return this.todoModel.find({
      status: 'DONE',
      active: true,
      createdAt: { $lte: oneMonthAgo },
    }).exec();
  }


  public async findOne(id: string): Promise<TodoDocument> {
    const item = await this.todoModel.findOne({ _id: id }).exec();
    if (!item) {
      throw new NotFoundException();
    }
    return item;
  }

  public async create(
    item: TodoDto,
    loggedInUser: IUser,
  ): Promise<TodoDocument> {
    const createdItem = new this.todoModel({
      ...item,
      completed: false,
      owner: loggedInUser,
      createDate: Date.now(),
      latsUdpatedDate: Date.now(),
      lastUpdatedBy: loggedInUser,
    });
    return await createdItem.save();
  }

  public async update(
    id: string,
    item: TodoDto,
    loggedInUser: IUser,
  ): Promise<TodoDocument> {
    return await this.todoModel
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

  public async delete(id: string, loggedInUser: IUser): Promise<TodoDocument> {
    const item = await this.findOne(id);
    item.active = false;
    item.latsUdpatedDate = Date.now();
    item.lastUpdatedBy = loggedInUser;
    return await this.todoModel.findOneAndUpdate({ _id: id }, item).exec();
  }

  public async deleteTaskCron(task:any): Promise<TodoDocument> {
    const item = await this.findOne(task._id);
    item.active = false;
    item.latsUdpatedDate = Date.now();
    return await this.todoModel.findOneAndUpdate({ _id: task._id }, item).exec();
  }
}
