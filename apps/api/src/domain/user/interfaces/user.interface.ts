import type { Email } from "domain/shared/value-objects/email.vo";
import type { HashPassword } from "domain/shared/value-objects/hashPassword.vo";
import type { Uuid } from "domain/shared/value-objects/uuid.vo";

export interface IUser {
	uuid: Uuid;
	email: Email;
	hashPassword: HashPassword;
}
