import type { IHashService } from "application/shared/interfaces/hash.interface";
import type { IUuidService } from "application/shared/interfaces/uuid.interface";
import { Email } from "domain/shared/value-objects/email.vo";
import { HashPassword } from "domain/shared/value-objects/hashPassword.vo";
import { Uuid } from "domain/shared/value-objects/uuid.vo";
import { User } from "domain/user/entities/user.entity";
import type { ICreateUser } from "domain/user/interface/create-user.interface";
import type { IUserJson } from "domain/user/interface/user-json.interface";

export class UserFactoryService {
	constructor(
		private readonly uuidService: IUuidService,
		private readonly hashService: IHashService,
	) {}

	public create(params: ICreateUser): User {
		const uuid = new Uuid(this.uuidService.generateV4());
		const email = params.email;
		const hashPassword = new HashPassword(this.hashService.sha512(params.password.value));

		return new User({
			uuid,
			email,
			hashPassword,
		});
	}
}
