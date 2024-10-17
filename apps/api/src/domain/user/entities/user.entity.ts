import { Email } from "domain/shared/value-objects/email.vo";
import { HashPassword } from "domain/shared/value-objects/hashPassword.vo";
import { Uuid } from "domain/shared/value-objects/uuid.vo";
import type { IUserJson } from "domain/user/interface/user-json.interface";
import type { IUser } from "domain/user/interface/user.interface";

export class User implements IUser {
	public readonly uuid: Uuid;
	public email: Email;
	public hashPassword: HashPassword;

	constructor(user: IUser) {
		this.uuid = user.uuid;
		this.email = user.email;
		this.hashPassword = user.hashPassword;
	}

	public static fromJson(json: IUserJson): User {
		return new User({
			uuid: new Uuid(json.uuid),
			email: new Email(json.email),
			hashPassword: new HashPassword(json.hashPassword),
		});
	}

	public toJson(): IUserJson {
		return {
			uuid: this.uuid.value,
			email: this.email.value,
			hashPassword: this.hashPassword.value,
		};
	}
}
