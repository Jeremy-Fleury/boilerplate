import { Body, Controller, Get, Inject, Param, Post, Put } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import type { CreateUserUseCase } from "application/user/use-cases/create-user/create-user.use-cases";
import type { GetUserByEmailUseCase } from "application/user/use-cases/get-user-by-email/get-user-by-email.use-cases";
import type { UpdateUserPasswordUseCase } from "application/user/use-cases/update-user-password/update-user-password.use-cases";
import { UserInputDto } from "infrastructure/user/dtos/inputs/user.input-dto";
import {
	CREATE_USER_USE_CASE,
	GET_USER_BY_EMAIL_USE_CASE,
	UPDATE_USER_PASSWORD_USE_CASE,
} from "infrastructure/user/modules/user.token";
import { UserOutputDto } from "../dtos/outputs/user.output-dto";

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

	@Get()
	async getByEmail(@Param("email") email: string): Promise<UserOutputDto> {
		const user = await this.getUserByEmailUseCase.execute(email);
		return UserOutputDto.from(user);
	}

	@ApiBody({ type: UserInputDto })
	@Post()
	async create(@Body() dto: UserInputDto): Promise<UserOutputDto> {
		const user = await this.createUserUseCase.execute(dto);
		return UserOutputDto.from(user);
	}

	@ApiBody({ type: UserInputDto })
	@Put()
	async updatePassword(@Body() dto: UserInputDto): Promise<UserOutputDto> {
		const user = await this.updateUserPasswordUseCase.execute(dto);
		return UserOutputDto.from(user);
	}
}
