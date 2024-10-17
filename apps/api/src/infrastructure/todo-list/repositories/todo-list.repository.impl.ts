import { Inject, Injectable } from "@nestjs/common";
import type { Uuid } from "domain/shared/value-objects/uuid.vo";
import { TodoList } from "domain/todo-list/entities/todo-list.entity";
import type { ITodoListRepository } from "domain/todo-list/repositories/todo-list.repository.interface";
import { PrismaService } from "infrastructure/prisma/services/prisma.service";

@Injectable()
export class TodoListRepositoryImpl implements ITodoListRepository {
	constructor(@Inject(PrismaService) private readonly prismaService: PrismaService) {}

	async findByUuid(uuid: Uuid): Promise<TodoList | null> {
		const todoList = await this.prismaService.todoList.findUnique({
			where: {
				uuid: uuid.value,
			},
			include: {
				todos: true,
			},
		});

		if (!todoList) {
			return null;
		}

		return TodoList.fromJson(todoList);
	}

	async findAllByOwnerUuid(ownerUuid: Uuid): Promise<TodoList[]> {
		const todoLists = await this.prismaService.todoList.findMany({
			where: {
				ownerUuid: ownerUuid.value,
			},
			include: {
				todos: true,
			},
		});

		return todoLists.map((todoList) => TodoList.fromJson(todoList));
	}

	async create(todoList: TodoList): Promise<TodoList> {
		const createdTodoList = await this.prismaService.todoList.create({
			data: {
				uuid: todoList.uuid.value,
				ownerUuid: todoList.ownerUuid.value,
				title: todoList.title,
				todos: {
					create: Array.from(todoList.todos.values()).map((todo) => ({
						uuid: todo.uuid.value,
						title: todo.title,
						description: todo.description,
						isDone: todo.isDone,
					})),
				},
			},
			include: {
				todos: true,
			},
		});

		return TodoList.fromJson(createdTodoList);
	}

	async update(todoList: TodoList): Promise<TodoList> {
		const updatedTodoList = await this.prismaService.todoList.update({
			where: {
				uuid: todoList.uuid.value,
			},
			data: {
				title: todoList.title,
				todos: {
					update: Array.from(todoList.todos.values()).map((todo) => ({
						where: { uuid: todo.uuid.value },
						data: todo.toJson(),
					})),
				},
			},
			include: {
				todos: true,
			},
		});

		return TodoList.fromJson(updatedTodoList);
	}

	async delete(uuid: Uuid): Promise<void> {
		await this.prismaService.todoList.delete({
			where: {
				uuid: uuid.value,
			},
		});
	}
}
