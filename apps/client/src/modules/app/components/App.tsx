import "../styles/global.css";
import { LoginPage } from "@/pages/login-page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function App() {
	const queryClient = new QueryClient({});

	return (
		<QueryClientProvider client={queryClient}>
			<LoginPage />
		</QueryClientProvider>
	);
}
