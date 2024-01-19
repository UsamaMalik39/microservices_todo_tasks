import { ApiProperty } from '@nestjs/swagger';

export class TodoRequestDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  title: string;
}

export interface TodoDto extends TodoRequestDto {
  active: boolean;
}
