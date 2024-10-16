import { useEffect, useState } from "react";
import "./App.css";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { ChatInterface } from "./components/ChatInterface.tsx";
import { ErrorView } from "./components/ErrorComponent.tsx";
import { Jokes } from "./components/Jokes.tsx";
import { ModelProviderChips } from "./components/ModelProviderChips.tsx";
import { checkForRequestErrors } from "./errors/ApiErrorClass.tsx";
import type { ApiInfo } from "./models/ApiInfo.tsx";
import { useModelOptionsFetch } from "./utils/ModelFunctions.tsx";

export const DEFAULT_WIDTH = 800;

export async function fetchApiInfo() {
	const baseUrl = import.meta.env.VITE_BASE_URL;
	const url = `${baseUrl}/info`;
	const response = await fetch(url);
	await checkForRequestErrors(response);
	return await response.json();
}

function App() {
	const [apiInfo, setApiInfo] = useState<ApiInfo | null>(null);
	const [error, setError] = useState<Error | null>(null);

	useModelOptionsFetch();

	useEffect(() => {
		fetchApiInfo()
			.then((result) => {
				setApiInfo(result);
			})
			.catch((e) => {
				setError(e);
			});
	}, []);

	if (error) return <ErrorView e={error} />;

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				alignItems: "center",
				height: "90vh",
			}}
		>
			<Stack spacing={10} divider={<Divider orientation="horizontal" />}>
				{apiInfo ? <ModelProviderChips /> : null}
				<Jokes />
				<ChatInterface />
			</Stack>
			<Typography
				sx={{ paddingTop: 8 }}
			>{`API v${apiInfo?.version}`}</Typography>
		</Box>
	);
}

export default App;
