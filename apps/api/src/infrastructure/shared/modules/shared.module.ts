import { Module } from "@nestjs/common";
import type { Provider } from "@nestjs/common";

import { HashServiceImpl } from "infrastructure/shared/services/hash.service";
import { UuidGeneratorImpl } from "infrastructure/shared/services/uuid.service";
import { HASH_SERVICE, UUID_SERVICE } from "./shared.token";

const infrastructure: Provider[] = [
	{
		provide: UUID_SERVICE,
		useClass: UuidGeneratorImpl,
	},
	{
		provide: HASH_SERVICE,
		useClass: HashServiceImpl,
	},
];

@Module({
	imports: [],
	controllers: [],
	providers: [...infrastructure],
	exports: [UUID_SERVICE, HASH_SERVICE],
})
export class SharedModule {}
