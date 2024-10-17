import type { IUuidService } from "application/shared/interfaces/uuid.interface";
import { Uuid } from "domain/shared/value-objects/uuid.vo";
import { Todo } from "domain/todo-list/entities/todo.entity";
import type { ICreateTodo } from "domain/todo-list/interfaces/create-todo.interface";

export class TodoFactoryService {
	constructor(private readonly uuidService: IUuidService) {}

	public create(params: ICreateTodo): Todo {
		return new Todo({
			uuid: new Uuid(this.uuidService.generateV4()),
			title: params.title,
			description: params.description,
			isDone: false,
		});
	}
}
