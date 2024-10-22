import type { IHashService } from "domain/shared/interfaces/hash.service.interface";
import type { IUuidService } from "domain/shared/interfaces/uuid.service.interface";
import type { Email } from "domain/shared/value-objects/email.vo";
import { HashPassword } from "domain/shared/value-objects/hashPassword.vo";
import type { Password } from "domain/shared/value-objects/password.vo";
import { Uuid } from "domain/shared/value-objects/uuid.vo";
import { User } from "domain/user/entities/user.entity";

interface IUserFactoryServiceParams {
	email: Email;
	password: Password;
}

export class UserFactoryService {
	constructor(
		private readonly uuidService: IUuidService,
		private readonly hashService: IHashService,
	) {}

	public create({ email, password }: IUserFactoryServiceParams): User {
		const uuid = new Uuid(this.uuidService.generateV4());
		const hashPassword = new HashPassword(this.hashService.sha512(password.value));

		return new User({
			uuid,
			email,
			hashPassword,
		});
	}
}
