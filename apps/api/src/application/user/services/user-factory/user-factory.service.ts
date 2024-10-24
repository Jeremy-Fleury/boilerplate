import type { IHashService } from "domain/shared/interfaces/hash.service.interface";
import type { IUuidService } from "domain/shared/interfaces/uuid.service.interface";
import { User } from "domain/user/entities/user.entity";

interface IUserFactoryServiceParams {
	email: string;
	password: string;
}

export class UserFactoryService {
	constructor(
		private readonly uuidService: IUuidService,
		private readonly hashService: IHashService,
	) {}

	public create(params: IUserFactoryServiceParams): User {
		const uuid = this.uuidService.generateV4();
		const hashPassword = this.hashService.sha512(params.password);

		return new User({
			uuid,
			email: params.email,
			hashPassword,
		});
	}
}
