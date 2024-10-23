import type { PrismaClient } from "@prisma/client";
import type { IUnitOfWorkContext } from "domain/shared/interfaces/unit-of-work-context.interface";
import type { IUnitOfWorkService } from "domain/shared/interfaces/unit-of-work.service.interface";
import { UserRepositoryImpl } from "infrastructure/user/repositories/user.repository.impl";

export class UnitOfWorkServiceImpl implements IUnitOfWorkService {
	constructor(private readonly prisma: PrismaClient) {}

	async execute<T>(callback: (context: IUnitOfWorkContext) => Promise<T>): Promise<T> {
		return this.prisma.$transaction(async (transaction) => {
			const context: IUnitOfWorkContext = {
				userRepository: new UserRepositoryImpl(transaction),
			};

			return callback(context);
		});
	}
}
