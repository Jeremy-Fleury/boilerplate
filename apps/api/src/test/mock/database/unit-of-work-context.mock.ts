import type { IUnitOfWorkContext } from "domain/database/interfaces/unit-of-work-context.interface";
import type { DeepMocked } from "test/utils/deep-mocked";

export const mockUnitOfWorkContext = (): DeepMocked<IUnitOfWorkContext> => ({
	userRepository: {
		findByEmail: jest.fn(),
		create: jest.fn(),
		update: jest.fn(),
		delete: jest.fn(),
	},
});
