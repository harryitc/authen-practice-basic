import { CanActivate, ExecutionContext, Injectable, SetMetadata, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';

import { Request } from "express";

import { jwtConstants } from "./const";
import { Reflector } from "@nestjs/core";

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
    ) {

    }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        console.log(context.switchToHttp().getRequest());

        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }


        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) throw new UnauthorizedException("Guard - Token lỗi: Không có quyền");

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants.secret,
            })

            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['user'] = payload;
        } catch (err) {
            throw new UnauthorizedException('Guard - ' + err);
        }

        return true;
    }

    private extractTokenFromHeader(request: any): string | undefined {
        const [type, token] = request.headers['X-Token-Bearer']?.toString().split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }


}