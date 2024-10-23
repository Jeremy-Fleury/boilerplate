import type { IHashService } from "domain/shared/interfaces/hash.service.interface";
import type { IUuidService } from "domain/shared/interfaces/uuid.service.interface";
import { Email } from "domain/shared/value-objects/email.vo";
import { HashPassword } from "domain/shared/value-objects/hashPassword.vo";
import { Password } from "domain/shared/value-objects/password.vo";
import { Uuid } from "domain/shared/value-objects/uuid.vo";
import { User } from "domain/user/entities/user.entity";
import { UserFactoryService } from "./user-factory.service";

describe("UserFactoryService", () => {
	let uuidService: jest.Mocked<IUuidService>;
	let hashService: jest.Mocked<IHashService>;
	let userFactoryService: UserFactoryService;

	beforeEach(() => {
		uuidService = {
			generateV4: jest.fn(),
		};

		hashService = {
			sha512: jest.fn(),
		};

		userFactoryService = new UserFactoryService(uuidService, hashService);
	});

	it("should create a user with the correct properties", () => {
		const emailValue = "test@example.com";
		const passwordValue = "!Password12345";
		const generatedUuid = "09d86683-0a19-4c9b-b891-a13fa7848074";
		const hashedPasswordValue =
			"300ff11778f678319ffca967bde30088963dbc2810e05e33dcac05363f20f65a50241e44740e854c6729b3470cace1406673a552c1c95204e6156912386982bf";

		uuidService.generateV4.mockReturnValue(generatedUuid);
		hashService.sha512.mockReturnValue(hashedPasswordValue);

		const email = new Email(emailValue);
		const password = new Password(passwordValue);

		const user = userFactoryService.create({ email, password });

		expect(uuidService.generateV4).toHaveBeenCalled();
		expect(hashService.sha512).toHaveBeenCalledWith(passwordValue);

		expect(user).toBeInstanceOf(User);
		expect(user.uuid).toBeInstanceOf(Uuid);
		expect(user.uuid.value).toBe(generatedUuid);

		expect(user.email).toBe(email);

		expect(user.hashPassword).toBeInstanceOf(HashPassword);
		expect(user.hashPassword.value).toBe(hashedPasswordValue);
	});
});
