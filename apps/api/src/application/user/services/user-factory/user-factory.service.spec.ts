import type { IHashService } from "domain/shared/interfaces/hash.service.interface";
import type { IUuidService } from "domain/shared/interfaces/uuid.service.interface";
import { mockHashService } from "test/mock/shared/hash.service.mock";
import { mockUuidService } from "test/mock/shared/uuid.service.mock";
import { UserFactoryService } from "./user-factory.service";

describe("UserFactoryService", () => {
	let uuidService: jest.Mocked<IUuidService>;
	let hashService: jest.Mocked<IHashService>;
	let userFactoryService: UserFactoryService;

	beforeEach(() => {
		uuidService = mockUuidService();
		hashService = mockHashService();
		userFactoryService = new UserFactoryService(uuidService, hashService);
	});

	it("should create a user with the correct properties", () => {
		const uuid = "09d86683-0a19-4c9b-b891-a13fa7848074";
		const email = "test@example.com";
		const password = "!Password12345";
		const hashedPassword = "hashedPassword";

		uuidService.generateV4.mockReturnValue(uuid);
		hashService.sha512.mockReturnValue(hashedPassword);

		const user = userFactoryService.create({ email, password });

		expect(uuidService.generateV4).toHaveBeenCalled();
		expect(hashService.sha512).toHaveBeenCalledWith(password);

		expect(user.uuid).toBe(uuid);
		expect(user.email).toBe(email);
		expect(user.hashPassword).toBe(hashedPassword);
	});
});
