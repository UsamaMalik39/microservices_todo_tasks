import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    required: true,
    type: String,
  })
  name: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  email: string;

  @ApiProperty({
    required: true,
    type: String,
  })
  password: string;

  @ApiProperty({
    required: true,
    type: Number,
  })
  createdOn: number;

  @ApiProperty({
    required: false,
    type: Boolean,
  })
  active: boolean;
}
