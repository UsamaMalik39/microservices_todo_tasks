import { ApiProperty } from '@nestjs/swagger';

export class TaskHistoryRequestDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  status: string;
}

export type TaskHistoryDto = TaskHistoryRequestDto;
