import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserInputDto {
	@ApiProperty({
		description: "The email address of the user",
		example: "user@example.com",
		required: true,
		type: String,
	})
	@IsEmail()
	email: string;

	@ApiProperty({
		description: "The password for the user account",
		example: "!Password1234",
		required: true,
		type: String,
	})
	@IsString()
	@IsNotEmpty()
	password: string;
}
