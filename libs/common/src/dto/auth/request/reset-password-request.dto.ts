import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class ResetPasswordRequestDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The token of the user',
        example: '1234567890',
    })
    token: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The password of the user',    
        example: 'password',
    })
    password: string;
}