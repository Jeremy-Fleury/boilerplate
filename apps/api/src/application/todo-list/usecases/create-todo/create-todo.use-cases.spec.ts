import { Uuid } from "domain/shared/value-objects/uuid.vo";
import type { Todo } from "domain/todo-list/entities/todo.entity";
import type { ICreateTodo } from "domain/todo-list/interfaces/create-todo.interface";
import type { ITodoRepository } from "domain/todo-list/repositories/todo.repository.interface";
import type { TodoFactoryService } from "~/application/todo-list/services/todo-factory/todo-factory.service";
import { CreateTodoUseCase } from "./create-todo.use-cases";

describe("CreateTodoUseCase", () => {
	let todoRepository: jest.Mocked<ITodoRepository>;
	let todoFactoryService: jest.Mocked<TodoFactoryService>;
	let createTodoUseCase: CreateTodoUseCase;

	beforeEach(() => {
		todoRepository = { create: jest.fn() } as unknown as jest.Mocked<ITodoRepository>;
		todoFactoryService = { create: jest.fn() } as unknown as jest.Mocked<TodoFactoryService>;
		createTodoUseCase = new CreateTodoUseCase(todoRepository, todoFactoryService);
	});

	it("devrait créer un todo et le sauvegarder dans le dépôt", async () => {
		const todoListUuid = new Uuid("855124ad-2cfd-4740-8682-164e280e413f");
		const params = { property: "testValue" } as unknown as ICreateTodo;
		const todo: Todo = { property: "testValue" } as unknown as Todo;

		todoFactoryService.create.mockReturnValue(todo);
		todoRepository.create.mockResolvedValue(todo);

		const result = await createTodoUseCase.execute(params, todoListUuid);

		expect(todoFactoryService.create).toHaveBeenCalledWith(params);
		expect(todoRepository.create).toHaveBeenCalledWith(todo, todoListUuid);
		expect(result).toBe(todo);
	});
});
