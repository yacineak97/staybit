import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import type { Request, Response } from 'express';
import { UserDocument } from '@app/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() req: Request & { user: UserDocument },
    @Res({ passthrough: true }) response: Response,
  ) {
    console.log('User login: ', req.user);
    const jwt = await this.authService.login(req.user, response);
    response.send(jwt);
  }
}
