import type { Email } from "domain/shared/value-objects/email.vo";
import type { Password } from "domain/shared/value-objects/password.vo";

export interface ICreateUser {
	email: Email;
	password: Password;
}
