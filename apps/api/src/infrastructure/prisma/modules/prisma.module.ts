import { Module } from "@nestjs/common";
import type { PrismaClient } from "@prisma/client";
import { PrismaService } from "infrastructure/prisma/services/prisma.service";
import { UnitOfWorkServiceImpl } from "../services/unit-of-work.service.impl";
import { PRISMA_SERVICE, UNIT_OF_WORK_SERVICE } from "./prisma.token";

@Module({
	providers: [
		{
			provide: PRISMA_SERVICE,
			useClass: PrismaService,
		},
		{
			provide: UNIT_OF_WORK_SERVICE,
			useFactory: (prisma: PrismaClient) => {
				return new UnitOfWorkServiceImpl(prisma);
			},
			inject: [PRISMA_SERVICE],
		},
	],
	exports: [PRISMA_SERVICE, UNIT_OF_WORK_SERVICE],
})
export class PrismaModule {}
