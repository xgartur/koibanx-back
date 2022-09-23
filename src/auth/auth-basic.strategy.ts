import { BasicStrategy } from 'passport-http';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Injectable()
export class HttpStrategy extends PassportStrategy(BasicStrategy) {
  constructor(
    private authService: AuthService
  ) {
    super({
      passReqToCallback: true,
    });
  }

  async validate(req: any, username: string, password: string): Promise<boolean> {
    const user = await this.authService.validateUser(username, password)
    if (!user) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
