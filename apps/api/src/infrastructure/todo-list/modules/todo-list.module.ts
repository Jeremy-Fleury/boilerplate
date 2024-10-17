import { Module } from "@nestjs/common";
import type { Provider } from "@nestjs/common";
import type { IHashService } from "application/shared/interfaces/hash.interface";
import type { IUuidService } from "application/shared/interfaces/uuid.interface";
import { UserFactoryService } from "application/user/services/user-factory.service";
import { CreateUserUseCase } from "application/user/use-cases/create-user.use-cases";
import { GetUserByEmailUseCase } from "application/user/use-cases/get-user-by-email.use-cases";
import type { IUserRepository } from "domain/user/repositories/user.repository.interface";
import { PrismaModule } from "infrastructure/prisma/prisma.module";
import { HashServiceImpl } from "infrastructure/shared/services/hash.service";
import { UuidGeneratorImpl } from "infrastructure/shared/services/uuid.service";
import { UserController } from "infrastructure/user/controllers/user.controller";
import {
	CREATE_USER_USE_CASE,
	GET_USER_BY_EMAIL_USE_CASE,
	HASH_SERVICE,
	USER_REPOSITORY,
	UUID_SERVICE,
} from "infrastructure/user/modules/user.token";
import { UserRepositoryImpl } from "infrastructure/user/repositories/user.repository.impl";

const infrastructure: Provider[] = [
	{
		provide: USER_REPOSITORY,
		useClass: UserRepositoryImpl,
	},
	{
		provide: UUID_SERVICE,
		useClass: UuidGeneratorImpl,
	},
	{
		provide: HASH_SERVICE,
		useClass: HashServiceImpl,
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
	imports: [PrismaModule],
	controllers: [UserController],
	providers: [...application, ...infrastructure],
	exports: [],
})
export class UserModule {}
