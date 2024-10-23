import type { IUuidService } from "domain/shared/interfaces/uuid.service.interface";
import { v4 as uuidv4 } from "uuid";

export class UuidGeneratorImpl implements IUuidService {
	generateV4(): string {
		return uuidv4();
	}
}
