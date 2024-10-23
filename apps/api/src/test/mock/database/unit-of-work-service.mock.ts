import type { IUnitOfWorkService } from "domain/database/interfaces/unit-of-work.service.interface";

export const mockUnitOfWorkService = (): jest.Mocked<IUnitOfWorkService> => ({
	execute: jest.fn(),
});
