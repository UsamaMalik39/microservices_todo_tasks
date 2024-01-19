import { HttpStatus } from '@nestjs/common';
import { UserDto } from './user.dto';

export class TokenDataResponseDto {
  status: HttpStatus;
  message: string;
  data: UserDto | null;
}
