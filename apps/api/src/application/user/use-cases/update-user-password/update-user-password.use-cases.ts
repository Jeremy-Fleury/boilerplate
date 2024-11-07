import { UnitOfWorkUseCase } from "application/database/use-cases/unit-of-work.use-case";
import type { IUnitOfWorkContext } from "domain/database/interfaces/unit-of-work-context.interface";
import type { IUnitOfWorkService } from "domain/database/interfaces/unit-of-work.service.interface";
import { ApplicationException } from "domain/shared/exceptions/application-exception";
import type { IHashService } from "domain/shared/interfaces/hash.service.interface";
import type { User } from "domain/user/entities/user.entity";

interface UpdateUserPasswordUseCaseParams {
	email: string;
	password: string;
}

export class UpdateUserPasswordUseCase extends UnitOfWorkUseCase<UpdateUserPasswordUseCaseParams, User> {
	constructor(
		private readonly hashService: IHashService,
		protected readonly unitOfWorkService: IUnitOfWorkService,
		protected readonly unitOfWorkContext?: IUnitOfWorkContext,
	) {
		super(unitOfWorkService, unitOfWorkContext);
	}

	protected async executeWithContext(
		context: IUnitOfWorkContext,
		params: UpdateUserPasswordUseCaseParams,
	): Promise<User> {
		const user = await context.userRepository.findByEmail(params.email);

		if (!user) {
			throw new ApplicationException("User not found");
		}

		user.hashPassword = this.hashService.sha512(params.password);

		const updatedUser = await context.userRepository.update(user);

		return updatedUser;
	}
}
