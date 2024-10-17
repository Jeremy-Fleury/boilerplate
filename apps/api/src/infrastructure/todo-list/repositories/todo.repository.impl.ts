import { Inject, Injectable } from "@nestjs/common";
import type { Uuid } from "domain/shared/value-objects/uuid.vo";
import { Todo } from "domain/todo-list/entities/todo.entity";
import type { ITodoRepository } from "domain/todo-list/repositories/todo.repository.interface";
import { PrismaService } from "infrastructure/prisma/services/prisma.service";

@Injectable()
export class TodoRepositoryImpl implements ITodoRepository {
	constructor(@Inject(PrismaService) private readonly prismaService: PrismaService) {}

	async findByUuid(uuid: Uuid): Promise<Todo | null> {
		const todo = await this.prismaService.todo.findUnique({
			where: {
				uuid: uuid.value,
			},
		});

		if (!todo) {
			return null;
		}

		return Todo.fromJson(todo);
	}

	async findAllByTodoListUuid(todoListUuid: Uuid): Promise<Todo[]> {
		const todos = await this.prismaService.todo.findMany({
			where: {
				todoListUuid: todoListUuid.value,
			},
		});

		return todos.map((todo) => Todo.fromJson(todo));
	}

	async create(todo: Todo, todoListUuid: Uuid): Promise<Todo> {
		const createdTodo = await this.prismaService.todo.create({
			data: {
				...todo.toJson(),
				todoList: {
					connect: {
						uuid: todoListUuid.value,
					},
				},
			},
		});

		return Todo.fromJson(createdTodo);
	}

	async update(todo: Todo): Promise<Todo> {
		const updatedTodo = await this.prismaService.todo.update({
			where: {
				uuid: todo.uuid.value,
			},
			data: todo.toJson(),
		});

		return Todo.fromJson(updatedTodo);
	}

	async delete(uuid: Uuid): Promise<void> {
		await this.prismaService.todo.delete({
			where: {
				uuid: uuid.value,
			},
		});
	}
}
