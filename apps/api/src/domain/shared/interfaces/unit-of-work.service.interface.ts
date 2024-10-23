import type { IUnitOfWorkContext } from "./unit-of-work-context.interface";

export interface IUnitOfWorkService {
	execute<T>(callback: (context: IUnitOfWorkContext) => Promise<T>): Promise<T>;
}
