import type { TodoFactoryService } from "application/todo-list/services/todo-factory.service";
import type { Uuid } from "domain/shared/value-objects/uuid.vo";
import type { Todo } from "domain/todo-list/entities/todo.entity";
import type { ICreateTodo } from "domain/todo-list/interfaces/create-todo.interface";
import type { ITodoRepository } from "domain/todo-list/repositories/todo.repository.interface";

export class CreateTodoUseCase {
	constructor(
		private readonly todoRepository: ITodoRepository,
		private readonly todoFactoryService: TodoFactoryService,
	) {}

	async execute(params: ICreateTodo, todoListUuid: Uuid): Promise<Todo> {
		const todo = this.todoFactoryService.create(params);
		return await this.todoRepository.create(todo, todoListUuid);
	}
}
