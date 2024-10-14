import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LoginPage } from "./pages/login-page";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const root = document.getElementById("root");

if (!root) {
	throw new Error("Root element not found");
}

const queryClient = new QueryClient({});

createRoot(root).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<LoginPage />
		</QueryClientProvider>
	</StrictMode>,
);
