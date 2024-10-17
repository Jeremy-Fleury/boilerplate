import type { TodoListFactoryService } from "application/todo-list/services/todo-list-factory.service";
import type { TodoList } from "domain/todo-list/entities/todo-list.entity";
import type { ICreateTodoList } from "domain/todo-list/interfaces/create-todo-list.interface";
import type { ITodoListRepository } from "~/domain/todo-list/repositories/todo-list.repository.interface";

export class CreateTodoListUseCase {
	constructor(
		private readonly todoListRepository: ITodoListRepository,
		private readonly todoListFactoryService: TodoListFactoryService,
	) {}

	async execute(params: ICreateTodoList): Promise<TodoList> {
		const todoList = this.todoListFactoryService.create(params);
		return await this.todoListRepository.create(todoList);
	}
}
