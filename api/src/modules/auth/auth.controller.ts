import { Body, Controller, Get, HttpCode, HttpStatus, Request, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { Public } from './auth.guard';

import { SignInDTO } from './dto/auth.dto';

@ApiTags("Quyền")
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {

    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() siginInDTO: SignInDTO) {
        return this.authService.signIn(siginInDTO.username, siginInDTO.password);
    }

    @HttpCode(HttpStatus.OK)
    @ApiBearerAuth('X-Token-Bearer')
    @Get('profile')
    getProfile(@Request() req: any) {
        console.log('req = ', req);
        return req.user;
    }

}
