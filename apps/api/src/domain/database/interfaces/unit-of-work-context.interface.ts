import type { IUserRepository } from "domain/user/repositories/user.repository.interface";

export interface IUnitOfWorkContext {
	userRepository: IUserRepository;
}
