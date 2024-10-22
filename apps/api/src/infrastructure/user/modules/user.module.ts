import { Module } from "@nestjs/common";
import type { Provider } from "@nestjs/common";
import { UserFactoryService } from "application/user/services/user-factory.service";
import { CreateUserUseCase } from "application/user/use-cases/create-user.use-cases";
import { GetUserByEmailUseCase } from "application/user/use-cases/get-user-by-email.use-cases";
import type { IHashService } from "domain/shared/interfaces/hash.service.interface";
import type { IUuidService } from "domain/shared/interfaces/uuid.service.interface";
import type { IUserRepository } from "domain/user/repositories/user.repository.interface";
import { PrismaModule } from "infrastructure/prisma/prisma.module";
import { HASH_SERVICE, UUID_SERVICE } from "infrastructure/shared/modules/shared.token";
import { UserController } from "infrastructure/user/controllers/user.controller";
import {
	CREATE_USER_USE_CASE,
	GET_USER_BY_EMAIL_USE_CASE,
	USER_REPOSITORY,
} from "infrastructure/user/modules/user.token";
import { UserRepositoryImpl } from "infrastructure/user/repositories/user.repository.impl";
import { SharedModule } from "~/infrastructure/shared/modules/shared.module";

const infrastructure: Provider[] = [
	{
		provide: USER_REPOSITORY,
		useClass: UserRepositoryImpl,
	},
];

const application: Provider[] = [
	{
		provide: UserFactoryService,
		useFactory: (uuidService: IUuidService, hashService: IHashService) => {
			return new UserFactoryService(uuidService, hashService);
		},
		inject: [UUID_SERVICE, HASH_SERVICE],
	},
	{
		provide: GET_USER_BY_EMAIL_USE_CASE,
		useFactory: (userRepository: IUserRepository) => {
			return new GetUserByEmailUseCase(userRepository);
		},
		inject: [USER_REPOSITORY],
	},
	{
		provide: CREATE_USER_USE_CASE,
		useFactory: (userRepository: IUserRepository, userFactoryService: UserFactoryService) => {
			return new CreateUserUseCase(userRepository, userFactoryService);
		},
		inject: [USER_REPOSITORY, UserFactoryService],
	},
];

@Module({
	imports: [PrismaModule, SharedModule],
	controllers: [UserController],
	providers: [...application, ...infrastructure],
	exports: [],
})
export class UserModule {}
