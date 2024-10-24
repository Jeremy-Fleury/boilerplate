import type { IUnitOfWorkContext } from "domain/database/interfaces/unit-of-work-context.interface";
import type { IUnitOfWorkService } from "domain/database/interfaces/unit-of-work.service.interface";
import { ApplicationException } from "domain/shared/exceptions/application-exception";
import type { IHashService } from "domain/shared/interfaces/hash.service.interface";
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

	it("should update the user password successfully", async () => {
		const email = "test@example.com";
		const oldPasswordHash = "oldHashPassword";
		const newPassword = "!newPassword1234";
		const newPasswordHash = "newHashPassword";

		const existingUser = {
			email,
			hashPassword: oldPasswordHash,
		} as unknown as User;

		const updatedUser = {
			email,
			hashPassword: newPasswordHash,
		} as unknown as User;

		unitOfWorkService.execute.mockImplementation((cb) => cb(unitOfWorkContext));
		unitOfWorkContext.userRepository.findByEmail.mockResolvedValue(existingUser);
		hashService.sha512.mockReturnValue(newPasswordHash);
		unitOfWorkContext.userRepository.update.mockResolvedValue(updatedUser);

		const result = await useCase.execute({ email, password: newPassword });

		expect(unitOfWorkContext.userRepository.findByEmail).toHaveBeenCalledWith(email);
		expect(hashService.sha512).toHaveBeenCalledWith(newPassword);
		expect(unitOfWorkContext.userRepository.update).toHaveBeenCalledWith(updatedUser);
		expect(result).toEqual(updatedUser);
	});

	it("should throw ApplicationException if user not found", async () => {
		const email = "nonexistent@example.com";
		const newPassword = "!newPassword1234";

		unitOfWorkService.execute.mockImplementation((cb) => cb(unitOfWorkContext));
		unitOfWorkContext.userRepository.findByEmail.mockResolvedValue(null);

		await expect(useCase.execute({ email, password: newPassword })).rejects.toThrow(ApplicationException);

		expect(unitOfWorkContext.userRepository.findByEmail).toHaveBeenCalledWith(email);
		expect(hashService.sha512).not.toHaveBeenCalled();
		expect(unitOfWorkContext.userRepository.update).not.toHaveBeenCalled();
	});
});
