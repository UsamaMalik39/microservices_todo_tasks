import { ApiProperty } from '@nestjs/swagger';
import { ITask } from 'src/repositories/model/task';

export class TaskRequestDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  title: string;
  @ApiProperty({
    required: true,
    type: String,
  })
  description: string;
  @ApiProperty({
    required: true,
    type: Number,
  })
  startDate: number;
  @ApiProperty({
    required: true,
    type: Number,
  })
  dueDate: number;
}

export interface TaskResponseDto extends ITask {
  totalMinutes: number;
}
