import { ApiProperty } from "@nestjs/swagger";
import { IsNumber} from "class-validator";

export class UserDto{
    @ApiProperty()
    @IsNumber()
    readonly userId: number;
}