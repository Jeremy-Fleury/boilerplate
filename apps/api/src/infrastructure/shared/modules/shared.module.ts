import { Module } from "@nestjs/common";
import type { Provider } from "@nestjs/common";
import { PrismaModule } from "infrastructure/prisma/prisma.module";

import { UnitOfWorkRepositoryImpl } from "infrastructure/prisma/repositories/unit-of-work.repository.impl";
import { HashServiceImpl } from "infrastructure/shared/services/hash.service";
import { UuidGeneratorImpl } from "infrastructure/shared/services/uuid.service";
import { HASH_SERVICE, UNIT_OF_WORK_REPOSITORY, UUID_SERVICE } from "./shared.token";

const infrastructure: Provider[] = [
	{
		provide: UUID_SERVICE,
		useClass: UuidGeneratorImpl,
	},
	{
		provide: HASH_SERVICE,
		useClass: HashServiceImpl,
	},
	{
		provide: UNIT_OF_WORK_REPOSITORY,
		useClass: UnitOfWorkRepositoryImpl,
	},
];

@Module({
	imports: [PrismaModule],
	controllers: [],
	providers: [...infrastructure],
	exports: [UUID_SERVICE, HASH_SERVICE, UNIT_OF_WORK_REPOSITORY],
})
export class SharedModule {}
