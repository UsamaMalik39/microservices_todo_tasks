import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/api/dto/user.dto';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  public createToken(model: UserDto): string {
    const token = this.jwtService.sign(
      {
        email: model.email,
      },
      {
        expiresIn: 30 * 24 * 60 * 60,
      },
    );
    return token;
  }

  public async decodeToken(token: string): Promise<{ email: string } | null> {
    let result = null;
    try {
      const tokenData = this.jwtService.decode(token) as {
        expiresIn: number;
        email: string;
      };
      if (!tokenData || tokenData.expiresIn <= Math.floor(+new Date() / 1000)) {
        result = null;
      } else {
        result = {
          email: tokenData.email,
        };
      }
    } catch (e) {
      result = null;
    }
    return result;
  }
}
