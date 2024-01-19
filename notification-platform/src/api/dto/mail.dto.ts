import { HttpStatus } from '@nestjs/common';

export class EmailRequestDto {
  to: string;
  subject: string;
  html?: string;
}

export class EmailResponseDto {
  status: HttpStatus;
  message: string;
}
