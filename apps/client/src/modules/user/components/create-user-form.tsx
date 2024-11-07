import { Button } from "@/modules/shared/components/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/modules/shared/components/form";
import { Input } from "@/modules/shared/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createUserFormSchema = z.object({
	email: z.string().email({
		message: "Invalid email address.",
	}),
	password: z
		.string()
		.min(12, {
			message: "Password must be at least 12 characters.",
		})
		.regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/, {
			message:
				"Password must contain at least 12 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character.",
		}),
});

interface CreateUserFormProps {
	onCreateUser: (user: z.infer<typeof createUserFormSchema>) => void;
}

export function CreateUserForm({ onCreateUser }: CreateUserFormProps) {
	const form = useForm<z.infer<typeof createUserFormSchema>>({
		resolver: zodResolver(createUserFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = (values: z.infer<typeof createUserFormSchema>) => {
		onCreateUser(values);
		form.reset();
	};

	return (
		<div className="w-1/4 bg-white rounded-lg p-10">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="Email" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type="password" placeholder="Password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit">Submit</Button>
				</form>
			</Form>
		</div>
	);
}
