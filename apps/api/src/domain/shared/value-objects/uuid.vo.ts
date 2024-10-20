import { DomainException } from "domain/shared/exceptions/domain-exception";

export class Uuid {
	constructor(public readonly value: string) {
		this.validate(value);
	}

	public equals(other: Uuid): boolean {
		return this.value === other.value;
	}

	private validate(uuid: string) {
		const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

		if (!regex.test(uuid)) {
			throw new DomainException("Invalid UUID format");
		}
	}
}
