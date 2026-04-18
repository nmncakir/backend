import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginResponseDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The token to login',
        example: '1234567890',
    })
    token: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The expiration date of the token',
        example: '2026-04-18T12:00:00.000Z',
    })
    expiresAt: string;
}