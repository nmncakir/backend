import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserRequestDto{
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