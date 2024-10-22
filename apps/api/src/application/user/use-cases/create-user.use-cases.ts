import type { UserFactoryService } from "application/user/services/user-factory.service";
import { Email } from "domain/shared/value-objects/email.vo";
import { Password } from "domain/shared/value-objects/password.vo";
import type { User } from "domain/user/entities/user.entity";
import type { IUserRepository } from "domain/user/repositories/user.repository.interface";

interface ICreateUserUseCaseParams {
	email: string;
	password: string;
}

export class CreateUserUseCase {
	constructor(
		private readonly userRepository: IUserRepository,
		private readonly userFactoryService: UserFactoryService,
	) {}

	async execute({ email, password }: ICreateUserUseCaseParams): Promise<User> {
		const user = this.userFactoryService.create({
			email: new Email(email),
			password: new Password(password),
		});

		const createdUser = await this.userRepository.create(user);

		return createdUser;
	}
}
