import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorView } from "./components/ErrorComponent.tsx";
import { ModelOptionProvider } from "./components/ModelOptionProvider.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ErrorBoundary
			fallback={<ErrorView e={Error("Something went wrong...")} />}
		>
			<ModelOptionProvider>
				<App />
			</ModelOptionProvider>
		</ErrorBoundary>
	</StrictMode>,
);
