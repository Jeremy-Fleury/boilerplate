import { ApplicationException } from "domain/shared/exceptions/application-exception";
import type { IHashService } from "domain/shared/interfaces/hash.service.interface";
import type { IUnitOfWorkContext } from "domain/shared/interfaces/unit-of-work-context.interface";
import type { IUnitOfWorkService } from "domain/shared/interfaces/unit-of-work.service.interface";
import { Email } from "domain/shared/value-objects/email.vo";
import { HashPassword } from "domain/shared/value-objects/hashPassword.vo";
import { Password } from "domain/shared/value-objects/password.vo";
import type { User } from "domain/user/entities/user.entity";

interface UpdateUserPasswordUseCaseParams {
	email: string;
	password: string;
}

export class UpdateUserPasswordUseCase {
	constructor(
		private readonly unitOfWorkService: IUnitOfWorkService,
		private readonly hashService: IHashService,
	) {}

	async execute(params: UpdateUserPasswordUseCaseParams): Promise<User> {
		return this.unitOfWorkService.execute(async (context: IUnitOfWorkContext) => {
			const user = await context.userRepository.findByEmail(new Email(params.email));

			if (!user) {
				throw new ApplicationException("User not found");
			}

			const password = new Password(params.password);
			const hashPassword = new HashPassword(this.hashService.sha512(password.value));

			user.hashPassword = hashPassword;

			const updatedUser = await context.userRepository.update(user);

			return updatedUser;
		});
	}
}
