import type { IUserRepository } from "domain/user/repositories/user.repository.interface";

export interface IUnitOfWorkRepository {
	userRepository: IUserRepository;
	complete(): Promise<void>;
	rollback(): Promise<void>;
}
