import type { UserFactoryService } from "application/user/services/user-factory.service";
import { ApplicationException } from "domain/shared/exceptions/application-exception";
import type { IHashService } from "domain/shared/interfaces/hash.service.interface";
import type { IUnitOfWorkRepository } from "domain/shared/repositories/unit-of-work.repository.interface";
import { Email } from "domain/shared/value-objects/email.vo";
import { HashPassword } from "domain/shared/value-objects/hashPassword.vo";
import { Password } from "domain/shared/value-objects/password.vo";
import type { User } from "domain/user/entities/user.entity";

interface UpdateUserPasswordUseCaseParams {
	email: string;
	newPassword: string;
}

export class UpdateUserPasswordUseCase {
	constructor(
		private readonly unitOfWorkRepository: IUnitOfWorkRepository,
		private readonly hashService: IHashService,
	) {}

	async execute(params: UpdateUserPasswordUseCaseParams): Promise<User> {
		const user = await this.unitOfWorkRepository.userRepository.findByEmail(new Email(params.email));

		if (!user) {
			throw new ApplicationException("User not found");
		}

		const password = new Password(params.newPassword);
		const hashPassword = new HashPassword(this.hashService.sha512(password.value));

		user.hashPassword = hashPassword;

		const updatedUser = await this.unitOfWorkRepository.userRepository.update(user);

		return updatedUser;
	}
}
