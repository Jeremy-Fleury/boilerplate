import { Uuid } from "domain/shared/value-objects/uuid.vo";
import type { ITodoJson } from "../interfaces/todo-json.interface";
import type { ITodo } from "../interfaces/todo.interface";

export class Todo implements ITodo {
	uuid: Uuid;
	title: string;
	description: string;
	isDone: boolean;

	constructor(todo: ITodo) {
		this.uuid = todo.uuid;
		this.title = todo.title;
		this.description = todo.description;
		this.isDone = todo.isDone;
	}

	public static fromJson(json: ITodoJson): Todo {
		return new Todo({
			uuid: new Uuid(json.uuid),
			title: json.title,
			description: json.description,
			isDone: json.isDone,
		});
	}

	public toJson(): ITodoJson {
		return {
			uuid: this.uuid.value,
			title: this.title,
			description: this.description,
			isDone: this.isDone,
		};
	}
}
