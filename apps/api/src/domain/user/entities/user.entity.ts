import type { IUserJson } from "domain/user/interfaces/user-json.interface";

export class User {
	public readonly uuid: string;
	public email: string;
	public hashPassword: string;

	public constructor(user: IUserJson) {
		this.uuid = user.uuid;
		this.email = user.email;
		this.hashPassword = user.hashPassword;
	}

	public toJson(): IUserJson {
		return {
			uuid: this.uuid,
			email: this.email,
			hashPassword: this.hashPassword,
		};
	}
}
