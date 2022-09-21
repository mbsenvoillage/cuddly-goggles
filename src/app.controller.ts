import { Controller, HttpCode, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth/auth.service';
import { LoginDto } from './auth/login.dto';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  /*
  1- Thanks to the AuthGuard, the route handler will only be invoked if the user has been validated
  2- The req parameter will contain a user property (populated by Passport during the passport-local authentication flow)
  */
  @HttpCode(200)
  @ApiBody({ type: LoginDto })
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
