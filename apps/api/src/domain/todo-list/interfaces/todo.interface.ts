import type { Uuid } from "domain/shared/value-objects/uuid.vo";

export interface ITodo {
	uuid: Uuid;
	title: string;
	description: string;
	isDone: boolean;
}
