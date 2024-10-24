import type { Prisma } from "@prisma/client";
import { User } from "domain/user/entities/user.entity";
import type { IUserRepository } from "domain/user/repositories/user.repository.interface";
import type { PrismaService } from "infrastructure/database-prisma/services/prisma.service";

export class UserRepositoryImpl implements IUserRepository {
	constructor(private readonly prisma: PrismaService | Prisma.TransactionClient) {}

	async findByEmail(email: string): Promise<User | null> {
		const user = await this.prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			return null;
		}

		return new User(user);
	}

	async create(user: User): Promise<User> {
		const createdUser = await this.prisma.user.create({
			data: user.toJson(),
		});

		return new User(createdUser);
	}

	async update(user: User): Promise<User> {
		const updatedUser = await this.prisma.user.update({
			where: {
				uuid: user.uuid,
			},
			data: user.toJson(),
		});

		return new User(updatedUser);
	}

	async delete(email: string): Promise<void> {
		await this.prisma.user.delete({
			where: {
				email,
			},
		});
	}
}
