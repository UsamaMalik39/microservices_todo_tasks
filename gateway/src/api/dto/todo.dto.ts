import { ApiProperty } from '@nestjs/swagger';

export class TodoRequestDto {
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
    type: String,
  })
  status: string;
}

export interface TodoDto extends TodoRequestDto {
  active: boolean;
  status: string;
}
