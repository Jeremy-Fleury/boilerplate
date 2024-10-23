import type { IUnitOfWorkContext } from "domain/database/interfaces/unit-of-work-context.interface";
import type { IUnitOfWorkService } from "domain/database/interfaces/unit-of-work.service.interface";
import { ApplicationException } from "domain/shared/exceptions/application-exception";
import type { IHashService } from "domain/shared/interfaces/hash.service.interface";
import { Email } from "domain/shared/value-objects/email.vo";
import { HashPassword } from "domain/shared/value-objects/hashPassword.vo";
import type { User } from "domain/user/entities/user.entity";
import { mockUnitOfWorkContext } from "test/mock/database/unit-of-work-context.mock";
import { mockUnitOfWorkService } from "test/mock/database/unit-of-work-service.mock";
import { mockHashService } from "test/mock/shared/hash.service.mock";
import type { DeepMocked } from "test/utils/deep-mocked";
import { UpdateUserPasswordUseCase } from "./update-user-password.use-cases";

describe("UpdateUserPasswordUseCase", () => {
	let hashService: jest.Mocked<IHashService>;
	let unitOfWorkService: jest.Mocked<IUnitOfWorkService>;
	let unitOfWorkContext: DeepMocked<IUnitOfWorkContext>;

	let useCase: UpdateUserPasswordUseCase;

	beforeEach(() => {
		hashService = mockHashService();
		unitOfWorkService = mockUnitOfWorkService();
		unitOfWorkContext = mockUnitOfWorkContext();

		useCase = new UpdateUserPasswordUseCase(unitOfWorkService, hashService);
	});

	const createUser = (email: string, password: string): User =>
		({
			email: new Email(email),
			hashPassword: new HashPassword(password),
		}) as unknown as User;

	it("should update the user password successfully", async () => {
		const email = "test@example.com";
		const oldPasswordHash =
			"6078323ed39adeca3f16d2f4e523152f014a3663700a388c58b00d94c9bf9e5850d496ad448a6c0ef9275709d281493ba7c222ecc0b491c8691f7954dec49fe8";
		const newPassword = "!newPassword1234";
		const newPasswordHash =
			"4ff341019229768c97897c63d728a713f3ec902c57bafc6d27663274719d140741858b28832c69bb7d1afd040ded6ce36524ca02c30c11d9678b4f0cee053a81";

		const existingUser = createUser(email, oldPasswordHash);
		const updatedUser = createUser(email, newPasswordHash);

		unitOfWorkService.execute.mockImplementation((cb) => cb(unitOfWorkContext));
		unitOfWorkContext.userRepository.findByEmail.mockResolvedValue(existingUser);
		hashService.sha512.mockReturnValue(newPasswordHash);
		unitOfWorkContext.userRepository.update.mockResolvedValue(updatedUser);

		const result = await useCase.execute({ email, password: newPassword });

		expect(unitOfWorkContext.userRepository.findByEmail).toHaveBeenCalledWith(new Email(email));
		expect(hashService.sha512).toHaveBeenCalledWith(newPassword);
		expect(unitOfWorkContext.userRepository.update).toHaveBeenCalledWith(updatedUser);
		expect(result).toEqual(updatedUser);
	});

	it("should throw ApplicationException if user not found", async () => {
		const email = "nonexistent@example.com";
		const password = "!newPassword1234";

		unitOfWorkService.execute.mockImplementation((cb) => cb(unitOfWorkContext));
		unitOfWorkContext.userRepository.findByEmail.mockResolvedValue(null);

		await expect(useCase.execute({ email, password })).rejects.toThrow(ApplicationException);

		expect(unitOfWorkContext.userRepository.findByEmail).toHaveBeenCalledWith(new Email(email));
		expect(hashService.sha512).not.toHaveBeenCalled();
		expect(unitOfWorkContext.userRepository.update).not.toHaveBeenCalled();
	});
});
