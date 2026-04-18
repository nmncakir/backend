import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class RegisterRequestDto{
    @IsEmail()
    @ApiProperty({
        description: 'The email of the user',
        example: 'test@example.com',
    })
    @IsEmail()
    email: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The username of the user',
        example: 'username',
    })
    username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The password of the user',
        example: 'password',
    })
    password: string;
}