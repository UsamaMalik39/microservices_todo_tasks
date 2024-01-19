import { HttpStatus } from '@nestjs/common';
import { UserDto } from './user.dto';

export class TokenResponseDto {
  status: HttpStatus;
  message: string;
  data: UserDto | null;
}
