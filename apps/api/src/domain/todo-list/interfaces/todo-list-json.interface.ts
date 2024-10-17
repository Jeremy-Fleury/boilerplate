import type { ITodoJson } from "./todo-json.interface";

export interface ITodoListJson {
	uuid: string;
	ownerUuid: string;
	title: string;
	todos: ITodoJson[];
}
