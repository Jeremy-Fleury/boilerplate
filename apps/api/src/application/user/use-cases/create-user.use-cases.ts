import type { UserFactoryService } from "application/user/services/user-factory.service";
import type { ICreateUser } from "domain/user/interfaces/create-user.interface";
import type { IUserRepository } from "domain/user/repositories/user.repository.interface";

export class CreateUserUseCase {
	constructor(
		private readonly userRepository: IUserRepository,
		private readonly userFactoryService: UserFactoryService,
	) {}

	async execute(params: ICreateUser): Promise<void> {
		const user = this.userFactoryService.create(params);
		await this.userRepository.create(user);
	}
}
