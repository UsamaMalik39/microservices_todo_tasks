import { ApiProperty } from '@nestjs/swagger';
import { ITaskHistory } from 'src/repositories/model/task.history';

export class TaskHistoryRequestDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  status: string;
}

export type TaskHistoryDto = ITaskHistory;
