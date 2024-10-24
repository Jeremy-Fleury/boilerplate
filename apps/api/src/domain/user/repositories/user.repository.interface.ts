import type { User } from "domain/user/entities/user.entity";

export interface IUserRepository {
	findByEmail: (email: string) => Promise<User | null>;
	create: (user: User) => Promise<User>;
	update: (user: User) => Promise<User>;
	delete: (email: string) => Promise<void>;
}
