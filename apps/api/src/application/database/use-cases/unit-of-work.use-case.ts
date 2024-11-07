import type { IUnitOfWorkContext } from "domain/database/interfaces/unit-of-work-context.interface";
import type { IUnitOfWorkService } from "domain/database/interfaces/unit-of-work.service.interface";

export abstract class UnitOfWorkUseCase<TParams, TResult> {
	constructor(
		protected readonly unitOfWorkService: IUnitOfWorkService,
		protected readonly unitOfWorkContext?: IUnitOfWorkContext,
	) {}

	public async execute(params: TParams): Promise<TResult> {
		if (this.unitOfWorkContext) {
			return this.executeWithContext(this.unitOfWorkContext, params);
		}

		return this.unitOfWorkService.execute(
			async (context: IUnitOfWorkContext): Promise<TResult> => this.executeWithContext(context, params),
		);
	}

	protected abstract executeWithContext(context: IUnitOfWorkContext, params: TParams): Promise<TResult>;
}
