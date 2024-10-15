import { ApplicationException } from "domain/shared/exceptions/application-exception";
import type { Email } from "domain/shared/value-objects/email.vo";
import type { User } from "domain/user/entities/user.entity";
import type { IUserRepository } from "domain/user/repositories/user.repository.interface";

export class GetUserByEmailUseCase {
	constructor(private readonly userRepository: IUserRepository) {}

	async execute(email: Email): Promise<User> {
		const user = await this.userRepository.findByEmail(email);

		if (!user) {
			throw new ApplicationException("User not found");
		}

		return user;
	}
}
