import type { IUuidService } from "application/shared/interfaces/uuid.interface";
import { Uuid } from "domain/shared/value-objects/uuid.vo";
import { TodoList } from "domain/todo-list/entities/todo-list.entity";
import type { Todo } from "domain/todo-list/entities/todo.entity";
import type { ICreateTodoList } from "domain/todo-list/interfaces/create-todo-list.interface";

export class TodoListFactoryService {
	constructor(private readonly uuidService: IUuidService) {}

	public create(params: ICreateTodoList): TodoList {
		console.log("uuid", this.uuidService.generateV4(), params.ownerUuid);
		return new TodoList({
			uuid: new Uuid(this.uuidService.generateV4()),
			ownerUuid: new Uuid(params.ownerUuid),
			title: params.title,
			todos: new Map<Uuid, Todo>(),
		});
	}
}
