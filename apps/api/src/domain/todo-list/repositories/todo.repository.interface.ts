import type { Uuid } from "domain/shared/value-objects/uuid.vo";
import type { Todo } from "domain/todo-list/entities/todo.entity";

export interface ITodoRepository {
	findByUuid(uuid: Uuid): Promise<Todo | null>;
	findAllByTodoListUuid(todoListUuid: Uuid): Promise<Todo[]>;
	create(todo: Todo, todoListUuid: Uuid): Promise<Todo>;
	update(todo: Todo): Promise<Todo>;
	delete(uuid: Uuid): Promise<void>;
}
