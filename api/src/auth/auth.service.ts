import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);

        if (!user) {
            throw new NotFoundException(`User #${username} Không tìm thấy`);
        }

        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.userId, username: user.username };

        const accessToken = await this.jwtService.signAsync(payload, {})

        return {
            accessToken: accessToken,
        };
    }
}
