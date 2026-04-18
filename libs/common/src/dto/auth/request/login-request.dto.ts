import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginRequestDto{
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The email of the user',
        example: 'test@example.com',
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The password of the user',
        example: 'password',
    })
    password: string;
}