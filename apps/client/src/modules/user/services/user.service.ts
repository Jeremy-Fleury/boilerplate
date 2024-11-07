import { openapiConfig } from "@/modules/shared/services/openapi-config.service";
import type { UserInputDto } from "@org/api-client";
import { UserApi } from "@org/api-client/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const userApi = new UserApi(openapiConfig);

export const useGetUserByEmail = (email: string) => {
	return useQuery({
		queryKey: ["user", email],
		queryFn: async () => {
			const response = await userApi.userControllerGetByEmail(email);
			return response.data;
		},
	});
};

export const useCreateUser = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (userData: UserInputDto) => {
			await userApi.userControllerCreate(userData);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
	});
};
