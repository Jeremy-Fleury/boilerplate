import type { IUnitOfWorkContext } from "domain/database/interfaces/unit-of-work-context.interface";
import type { IUnitOfWorkService } from "domain/database/interfaces/unit-of-work.service.interface";
import { ApplicationException } from "domain/shared/exceptions/application-exception";
import type { IHashService } from "domain/shared/interfaces/hash.service.interface";
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
			const user = await context.userRepository.findByEmail(params.email);

			if (!user) {
				throw new ApplicationException("User not found");
			}

			user.hashPassword = this.hashService.sha512(params.password);

			const updatedUser = await context.userRepository.update(user);

			return updatedUser;
		});
	}
}
