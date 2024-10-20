import type { Uuid } from "domain/shared/value-objects/uuid.vo";
import type { ITodo } from "./todo.interface";

export interface ITodoList {
	uuid: Uuid;
	ownerUuid: Uuid;
	title: string;
	todos: Map<Uuid, ITodo>;
}
