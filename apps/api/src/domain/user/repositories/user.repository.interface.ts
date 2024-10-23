import type { Email } from "domain/shared/value-objects/email.vo";
import type { User } from "domain/user/entities/user.entity";

export interface IUserRepository {
	findByEmail: (email: Email) => Promise<User | null>;
	create: (user: User) => Promise<User>;
	update: (user: User) => Promise<User>;
	delete: (email: Email) => Promise<void>;
}
