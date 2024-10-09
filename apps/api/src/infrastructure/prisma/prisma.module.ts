import { PrismaService } from "@infrastructure/prisma/services/prisma.service";
import { Module } from "@nestjs/common";

@Module({
	providers: [PrismaService],
	exports: [PrismaService],
})
export class PrismaModule {}
