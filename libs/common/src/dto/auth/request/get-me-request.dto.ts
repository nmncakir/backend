import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class GetMeRequestDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'The token of the user',
        example: '1234567890',
    })
    token: string;
}