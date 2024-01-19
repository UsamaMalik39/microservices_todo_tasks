import { ApiProperty } from '@nestjs/swagger';

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
    type: Date,
  })
  startDate: Date;
  @ApiProperty({
    required: true,
    type: Date,
  })
  dueDate: Date;
}

export class TaskResponseDto extends TaskRequestDto {
  active: boolean;
  status: string;
  totalMinutes: number;
}
