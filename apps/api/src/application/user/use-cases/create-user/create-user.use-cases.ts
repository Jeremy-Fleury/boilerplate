import type { UserFactoryService } from "application/user/services/user-factory/user-factory.service";
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

	async execute(params: ICreateUserUseCaseParams): Promise<User> {
		const user = this.userFactoryService.create({
			email: params.email,
			password: params.password,
		});

		const createdUser = await this.userRepository.create(user);

		return createdUser;
	}
}
