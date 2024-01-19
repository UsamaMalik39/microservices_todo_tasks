import { HttpStatus } from '@nestjs/common';
import { UserDto } from './user.dto';

export class UserTokenDto {
  status: HttpStatus;
  message: string;
  data: UserDto | null;
}
