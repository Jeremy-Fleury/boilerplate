import type { IUuidService } from "domain/shared/interfaces/uuid.service.interface";

export const mockUuidService = (): jest.Mocked<IUuidService> => ({
	generateV4: jest.fn(),
});
