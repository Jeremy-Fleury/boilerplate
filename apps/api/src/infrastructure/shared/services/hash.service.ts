import { createHash } from "node:crypto";
import type { IHashService } from "domain/shared/interfaces/hash.service.interface";

export class HashServiceImpl implements IHashService {
	sha512(value: string): string {
		return createHash("sha512").update(value).digest("hex");
	}
}
