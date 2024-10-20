import type { Uuid } from "domain/shared/value-objects/uuid.vo";
import type { TodoList } from "domain/todo-list/entities/todo-list.entity";

export interface ITodoListRepository {
	findByUuid(uuid: Uuid): Promise<TodoList | null>;
	findAllByOwnerUuid(ownerUuid: Uuid): Promise<TodoList[]>;
	create(todoList: TodoList): Promise<TodoList>;
	update(todoList: TodoList): Promise<TodoList>;
	delete(uuid: Uuid): Promise<void>;
}
