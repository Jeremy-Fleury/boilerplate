import { CreateUserForm } from "@/modules/user/components/create-user-form";
import { useCreateUser } from "@/modules/user/services/user.service";

export function LoginPage() {
	const { mutate: createUser } = useCreateUser();

	return (
		<div className="flex items-center justify-center h-screen gap-10 p-10">
			<CreateUserForm onCreateUser={createUser} />
		</div>
	);
}
