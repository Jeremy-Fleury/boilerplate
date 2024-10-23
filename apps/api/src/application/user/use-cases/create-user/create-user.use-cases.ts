import { Email } from "domain/shared/value-objects/email.vo";
import { Password } from "domain/shared/value-objects/password.vo";
import type { User } from "domain/user/entities/user.entity";
import type { IUserRepository } from "domain/user/repositories/user.repository.interface";
import type { UserFactoryService } from "~/application/user/services/user-factory/user-factory.service";

interface ICreateUserUseCaseParams {
	email: string;
	password: string;
}

export class CreateUserUseCase {
	constructor(
		private readonly userRepository: IUserRepository,
		private readonly userFactoryService: UserFactoryService,
	) {}

	async execute(params: ICreateUserUseCaseParams): Promise<User> {
		const user = this.userFactoryService.create({
			email: new Email(params.email),
			password: new Password(params.password),
		});

		const createdUser = await this.userRepository.create(user);

		return createdUser;
	}
}
