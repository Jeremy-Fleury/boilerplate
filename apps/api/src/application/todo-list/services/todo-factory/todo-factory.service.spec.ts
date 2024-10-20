import { Uuid } from "domain/shared/value-objects/uuid.vo";
import { Todo } from "domain/todo-list/entities/todo.entity";
import type { ICreateTodo } from "domain/todo-list/interfaces/create-todo.interface";
import { TodoFactoryService } from "./todo-factory.service";

describe("TodoFactoryService", () => {
	let todoFactoryService: TodoFactoryService;

	beforeEach(() => {
		const mockUuidService = {
			generateV4: jest.fn().mockReturnValue("0b1b40f0-afe0-4a6d-8e9b-1c7a7bce15f9"),
		};

		todoFactoryService = new TodoFactoryService(mockUuidService);
	});

	describe("create", () => {
		it("should create a new Todo with the given parameters", () => {
			const createTodoParams: ICreateTodo = {
				title: "Test",
				description: "This is a test",
			};

			const todo = todoFactoryService.create(createTodoParams);

			expect(todo).toBeInstanceOf(Todo);
			expect(todo.uuid).toEqual(new Uuid("0b1b40f0-afe0-4a6d-8e9b-1c7a7bce15f9"));
			expect(todo.title).toEqual(createTodoParams.title);
			expect(todo.description).toEqual(createTodoParams.description);
			expect(todo.isDone).toEqual(false);
		});
	});
});
