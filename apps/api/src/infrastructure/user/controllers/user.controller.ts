import type { CreateUserUseCase } from "application/user/use-cases/create-user.use-cases";

import { Body, Controller, Get, Inject, Param, Post, Put } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import type { GetUserByEmailUseCase } from "application/user/use-cases/get-user-by-email.use-cases";
import type { UpdateUserPasswordUseCase } from "application/user/use-cases/update-user.use-cases";
import { Email } from "domain/shared/value-objects/email.vo";
import { Password } from "domain/shared/value-objects/password.vo";
import { CreateUserInputDto } from "infrastructure/user/dtos/inputs/create-user.input-dto";
import {
	CREATE_USER_USE_CASE,
	GET_USER_BY_EMAIL_USE_CASE,
	UPDATE_USER_PASSWORD_USE_CASE,
} from "infrastructure/user/modules/user.token";
import { UpdateUserPasswordInputDto } from "../dtos/inputs/update-user-password.input.dto";
import type { UserOutputDto } from "../dtos/outputs/user.output-dto";

@ApiTags("User")
@Controller("user")
export class UserController {
	constructor(
		@Inject(CREATE_USER_USE_CASE)
		private readonly createUserUseCase: CreateUserUseCase,
		@Inject(GET_USER_BY_EMAIL_USE_CASE)
		private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
		@Inject(UPDATE_USER_PASSWORD_USE_CASE)
		private readonly updateUserPasswordUseCase: UpdateUserPasswordUseCase,
	) {}

	@Get(":email")
	async getUserByEmail(@Param("email") email: string): Promise<UserOutputDto> {
		const user = await this.getUserByEmailUseCase.execute(email);

		return {
			uuid: user.uuid.value,
			email: user.email.value,
		};
	}

	@ApiBody({ type: CreateUserInputDto })
	@Post()
	async create(@Body() dto: CreateUserInputDto): Promise<UserOutputDto> {
		const user = await this.createUserUseCase.execute(dto);

		return {
			uuid: user.uuid.value,
			email: user.email.value,
		};
	}

	@ApiBody({ type: UpdateUserPasswordInputDto })
	@Put(":email")
	async updateUserPassword(@Body() dto: UpdateUserPasswordInputDto): Promise<void> {
		await this.updateUserPasswordUseCase.execute(dto);
	}
}
