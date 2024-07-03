import { Body, Controller, Get, HttpCode, HttpStatus, Request, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/auth.dto';
import { AuthGuard } from './auth.guard';

@ApiTags("Quyền")
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {

    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() siginInDTO: SignInDTO) {
        return this.authService.signIn(siginInDTO.username, siginInDTO.password);
    }

    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    @ApiBearerAuth()
    @Get('profile')
    getProfile(@Request() req: any) {
        console.log('req = ', req);
        return req.user;
    }

}
