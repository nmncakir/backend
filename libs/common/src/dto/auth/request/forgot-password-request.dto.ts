import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ForgotPasswordRequestDto{
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The email of the user',
        example: 'test@example.com',
    })
    email: string;
}