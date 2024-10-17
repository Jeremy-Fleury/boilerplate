import type { TodoListFactoryService } from "application/todo-list/services/todo-list-factory.service";
import type { TodoList } from "domain/todo-list/entities/todo-list.entity";
import type { ICreateTodoList } from "domain/todo-list/interfaces/create-todo-list.interface";
import type { ITodoListRepository } from "~/domain/todo-list/repositories/todo-list.repository.interface";
import { CreateTodoListUseCase } from "./create-todo-list.use-cases";

describe("CreateTodoListUseCase", () => {
	let createTodoListUseCase: CreateTodoListUseCase;
	let todoListRepository: jest.Mocked<ITodoListRepository>;
	let todoListFactoryService: jest.Mocked<TodoListFactoryService>;

	beforeEach(() => {
		todoListRepository = { create: jest.fn() } as unknown as jest.Mocked<ITodoListRepository>;
		todoListFactoryService = { create: jest.fn() } as unknown as jest.Mocked<TodoListFactoryService>;
		createTodoListUseCase = new CreateTodoListUseCase(todoListRepository, todoListFactoryService);
	});

	it("should create a new todo list", async () => {
		const createTodoListParams = { property: "value" } as unknown as ICreateTodoList;
		const createdTodoList = { property: "value" } as unknown as TodoList;

		todoListFactoryService.create.mockReturnValue(createdTodoList);
		todoListRepository.create.mockResolvedValue(createdTodoList);

		const todoList = await createTodoListUseCase.execute(createTodoListParams);

		expect(todoListFactoryService.create).toHaveBeenCalledWith(createTodoListParams);
		expect(todoListRepository.create).toHaveBeenCalledWith(createdTodoList);
		expect(todoList).toEqual(createdTodoList);
	});
});
