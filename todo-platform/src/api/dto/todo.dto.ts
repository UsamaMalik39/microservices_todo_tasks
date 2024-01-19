import { ApiProperty } from '@nestjs/swagger';
import { ITodo } from 'src/repositories/model/todo';

export class TodoRequestDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  title: string;
}

export interface TodoDto extends ITodo {
  active: boolean;
}
