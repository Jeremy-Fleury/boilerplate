import type { Prisma } from "@prisma/client";
import type { Email } from "domain/shared/value-objects/email.vo";
import { User } from "domain/user/entities/user.entity";
import type { IUserRepository } from "domain/user/repositories/user.repository.interface";
import type { PrismaService } from "infrastructure/prisma/services/prisma.service";

export class UserRepositoryImpl implements IUserRepository {
	constructor(private readonly prisma: PrismaService | Prisma.TransactionClient) {}

	async findByEmail(email: Email): Promise<User | null> {
		const user = await this.prisma.user.findUnique({
			where: {
				email: email.value,
			},
		});

		if (!user) {
			return null;
		}

		return User.fromJson(user);
	}

	async create(user: User): Promise<User> {
		const createdUser = await this.prisma.user.create({
			data: user.toJson(),
		});

		return User.fromJson(createdUser);
	}

	async update(user: User): Promise<User> {
		const updatedUser = await this.prisma.user.update({
			where: {
				uuid: user.uuid.value,
			},
			data: user.toJson(),
		});

		return User.fromJson(updatedUser);
	}

	async delete(email: Email): Promise<void> {
		await this.prisma.user.delete({
			where: {
				email: email.value,
			},
		});
	}
}
