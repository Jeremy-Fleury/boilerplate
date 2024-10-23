import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUserPasswordInputDto {
	@ApiProperty({
		description: "The email address of the user",
		example: "user@example.com",
		required: true,
		type: String,
	})
	@IsEmail()
	email: string;

	@ApiProperty({
		description: "The new password for the user account",
		example: "!Password1234",
		required: true,
		type: String,
	})
	@IsString()
	@IsNotEmpty()
	newPassword: string;
}
