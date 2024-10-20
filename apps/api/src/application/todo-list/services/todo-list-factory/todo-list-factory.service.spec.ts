import { Uuid } from "domain/shared/value-objects/uuid.vo";
import { TodoList } from "domain/todo-list/entities/todo-list.entity";
import type { ICreateTodoList } from "domain/todo-list/interfaces/create-todo-list.interface";
import { TodoListFactoryService } from "./todo-list-factory.service";

describe("TodoListFactoryService", () => {
	let todoListFactoryService: TodoListFactoryService;

	beforeEach(() => {
		const mockUuidService = {
			generateV4: jest.fn().mockReturnValue("41a17536-4973-4a4f-833d-82fada70af79"),
		};

		todoListFactoryService = new TodoListFactoryService(mockUuidService);
	});

	describe("create", () => {
		it("should create a new TodoList with the given parameters", () => {
			const createTodoListParams: ICreateTodoList = {
				title: "My Todo List",
				ownerUuid: "5db9d77a-bcf2-4c39-aea7-950c23a3cc99",
			};

			const todoList = todoListFactoryService.create(createTodoListParams);

			expect(todoList).toBeInstanceOf(TodoList);
			expect(todoList.uuid).toEqual(new Uuid("41a17536-4973-4a4f-833d-82fada70af79"));
			expect(todoList.title).toEqual(createTodoListParams.title);
			expect(todoList.ownerUuid).toEqual(new Uuid(createTodoListParams.ownerUuid));
			expect(todoList.todos).toBeInstanceOf(Map);
			expect(todoList.todos.size).toBe(0);
		});
	});
});
