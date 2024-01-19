import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Base } from './base.schema';
import { Todo } from './todo.schema';

export type TaskDocument = Task & Document;

@Schema()
export class Task extends Base {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Todo' })
  todo: Todo;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  startDate: number;

  @Prop()
  dueDate: number;

  @Prop()
  active: boolean;

  @Prop()
  status: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
