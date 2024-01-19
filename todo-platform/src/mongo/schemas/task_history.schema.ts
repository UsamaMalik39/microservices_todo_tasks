import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Task } from './task.schema';
import { User } from './user.schema';

export type TaskHistoryDocument = TaskHistory & Document;

@Schema()
export class TaskHistory {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Task' })
  task: Task;

  @Prop()
  status: string;

  @Prop()
  startDate: number;

  @Prop()
  endDate: number;
}

export const TaskHistorySchema = SchemaFactory.createForClass(TaskHistory);
