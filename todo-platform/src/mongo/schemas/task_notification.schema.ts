import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Base } from './base.schema';

export type TaskNotificationDocument = TaskNotification & Document;

@Schema()
export class TaskNotification extends Base {

  @Prop()
  type: string;
}

export const TaskNotificationSchema =
  SchemaFactory.createForClass(TaskNotification);
