import { Module } from "@nestjs/common";
import type { Provider } from "@nestjs/common";

import { HashServiceImpl } from "infrastructure/shared/services/hash.service";
import { UuidGeneratorImpl } from "infrastructure/shared/services/uuid.service";
import { HASH_SERVICE, UUID_SERVICE } from "./shared.token";

const uuidService: Provider = {
	provide: UUID_SERVICE,
	useFactory: () => {
		return new UuidGeneratorImpl();
	},
};

const hashService: Provider = {
	provide: HASH_SERVICE,
	useFactory: () => {
		return new HashServiceImpl();
	},
};

@Module({
	imports: [],
	controllers: [],
	providers: [uuidService, hashService],
	exports: [UUID_SERVICE, HASH_SERVICE],
})
export class SharedModule {}
