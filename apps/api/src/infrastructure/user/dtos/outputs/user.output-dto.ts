import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsUUID } from "class-validator";
import type { User } from "domain/user/entities/user.entity";

export class UserOutputDto {
	@ApiProperty({
		description: "The uuid of the user",
		example: "123e4567-e89b-12d3-a456-426614174000",
		required: true,
		type: String,
	})
	@IsUUID()
	@IsNotEmpty()
	uuid: string;

	@ApiProperty({
		description: "The email address of the user",
		example: "user@example.com",
		required: true,
		type: String,
	})
	@IsEmail()
	@IsNotEmpty()
	email: string;

	static from(user: User): UserOutputDto {
		return {
			uuid: user.uuid,
			email: user.email,
		};
	}
}
