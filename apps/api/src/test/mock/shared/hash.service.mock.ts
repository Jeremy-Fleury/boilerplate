import type { IHashService } from "domain/shared/interfaces/hash.service.interface";

export const mockHashService = (): jest.Mocked<IHashService> => ({
	sha512: jest.fn(),
});
