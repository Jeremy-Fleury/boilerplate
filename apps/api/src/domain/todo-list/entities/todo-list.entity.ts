import { Uuid } from "domain/shared/value-objects/uuid.vo";
import type { ITodoListJson } from "../interfaces/todo-list-json.interface";
import type { ITodoList } from "../interfaces/todo-list.interface";
import { Todo } from "./todo.entity";

export class TodoList implements ITodoList {
	uuid: Uuid;
	ownerUuid: Uuid;
	title: string;
	todos: Map<Uuid, Todo>;

	constructor(todoList: ITodoList) {
		this.uuid = todoList.uuid;
		this.ownerUuid = todoList.ownerUuid;
		this.title = todoList.title;
		this.todos = new Map<Uuid, Todo>();

		for (const [uuid, todo] of todoList.todos) {
			this.todos.set(uuid, new Todo(todo));
		}
	}

	public static fromJson(json: ITodoListJson): TodoList {
		return new TodoList({
			uuid: new Uuid(json.uuid),
			ownerUuid: new Uuid(json.ownerUuid),
			title: json.title,
			todos: new Map<Uuid, Todo>(json.todos.map((todo) => [new Uuid(todo.uuid), Todo.fromJson(todo)])),
		});
	}

	public toJson(): ITodoListJson {
		return {
			uuid: this.uuid.value,
			ownerUuid: this.ownerUuid.value,
			title: this.title,
			todos: Array.from(this.todos.values()).map((todo) => todo.toJson()),
		};
	}
}
