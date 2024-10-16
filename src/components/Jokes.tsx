import { useState } from "react";
import { Button, CircularProgress, Stack } from "@mui/material";
import { DEFAULT_WIDTH } from "../App.tsx";
import { RefreshOutlined } from "@mui/icons-material";
import { AiExtendedResponse } from "../models/AiResponse.tsx";
import { AiResponseComponent } from "./AiPrompt.tsx";
import { ErrorView } from "./ErrorComponent.tsx";
import { generateSessionId } from "../Utils.ts";
import { checkForRequestErrors } from "../errors/ApiErrorClass.tsx";

async function fetchAiJoke() {
	const baseUrl = import.meta.env.VITE_BASE_URL;
	const modelProvider = import.meta.env.VITE_MODEL_PROVIDER;
	const url = `${baseUrl}/joke?modelProvider=${modelProvider}&userId=${generateSessionId()}`;
	const response = await fetch(url);
	await checkForRequestErrors(response);
	return await response.json();
}

export function Jokes() {
	const [jokeResponse, setJokeResponse] = useState<AiExtendedResponse | null>(
		null,
	);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	const generateJoke = () => {
		setIsLoading(true);
		fetchAiJoke()
			.then((result) => {
				setJokeResponse(result);
				setIsLoading(false);
			})
			.catch((e) => {
				setError(e);
				setIsLoading(false);
			});
	};

	if (error) return <ErrorView e={error} />;

	return (
		<Stack
			spacing={2}
			sx={{
				width: DEFAULT_WIDTH,
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
			}}
		>
			{jokeResponse ? <AiResponseComponent response={jokeResponse} /> : null}
			<Button
				onClick={generateJoke}
				variant="contained"
				disabled={isLoading}
				endIcon={
					isLoading ? (
						<CircularProgress size={16} sx={{ color: "white" }} />
					) : (
						<RefreshOutlined />
					)
				}
				sx={{ width: 200 }}
			>
				Generate joke
			</Button>
		</Stack>
	);
}
