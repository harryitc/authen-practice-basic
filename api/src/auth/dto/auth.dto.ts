import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInDTO {
    @ApiProperty({
        example: 'username',
    })
    @IsString()
    username: string;

    @ApiProperty({
        example: 'password',
    })
    @IsString()
    password: string;
}