import { ApiProperty } from '@nestjs/swagger';
import { IUser } from 'src/repositories/model/user';

export class UserDto extends IUser {
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
