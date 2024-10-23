import { Inject, Injectable } from "@nestjs/common";
import type { Prisma, PrismaClient } from "@prisma/client";
import type { IUnitOfWorkRepository } from "domain/shared/repositories/unit-of-work.repository.interface";
import type { IUserRepository } from "domain/user/repositories/user.repository.interface";
import { UserRepositoryImpl } from "infrastructure/user/repositories/user.repository.impl";
import { PrismaService } from "../services/prisma.service";

@Injectable()
export class UnitOfWorkRepositoryImpl implements IUnitOfWorkRepository {
	private transactionClient: Prisma.TransactionClient;

	public userRepository: IUserRepository;

	constructor(@Inject(PrismaService) private readonly prisma: PrismaClient) {}

	async start() {
		this.transactionClient = await this.prisma.$transaction(async (prisma) => prisma);
		this.userRepository = new UserRepositoryImpl(this.transactionClient);
	}

	async complete(): Promise<void> {
		// Prisma transactions are auto-commit, so nothing to do here
	}

	async rollback(): Promise<void> {
		// Prisma transactions automatically handle rollback in case of an error
	}
}
