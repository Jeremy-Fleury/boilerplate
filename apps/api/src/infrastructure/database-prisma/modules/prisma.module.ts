import { Module } from "@nestjs/common";
import type { Provider } from "@nestjs/common";
import type { PrismaClient } from "@prisma/client";
import { PrismaService } from "../services/prisma.service";
import { UnitOfWorkServiceImpl } from "../services/unit-of-work.service.impl";
import { PRISMA_SERVICE, UNIT_OF_WORK_SERVICE } from "./prisma.token";

const prismaService: Provider = {
	provide: PRISMA_SERVICE,
	useClass: PrismaService,
};

const unitOfWorkService: Provider = {
	provide: UNIT_OF_WORK_SERVICE,
	useFactory: (prisma: PrismaClient) => {
		return new UnitOfWorkServiceImpl(prisma);
	},
	inject: [PRISMA_SERVICE],
};

@Module({
	providers: [prismaService, unitOfWorkService],
	exports: [PRISMA_SERVICE, UNIT_OF_WORK_SERVICE],
})
export class PrismaModule {}
