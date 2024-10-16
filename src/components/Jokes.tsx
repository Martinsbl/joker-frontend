import { RefreshOutlined } from "@mui/icons-material";
import { Button, CircularProgress, Stack } from "@mui/material";
import { useState } from "react";
import { DEFAULT_WIDTH } from "../App.tsx";
import { generateSessionId } from "../Utils.ts";
import { checkForRequestErrors } from "../errors/ApiErrorClass.tsx";
import type { AiExtendedResponse } from "../models/AiResponse.tsx";
import { useModelOption } from "../utils/ModelFunctions.tsx";
import { AiResponseComponent } from "./AiPrompt.tsx";
import { ErrorView } from "./ErrorComponent.tsx";

async function fetchAiJoke(selectedOption: string) {
	const baseUrl = import.meta.env.VITE_BASE_URL;
	const url = `${baseUrl}/joke?modelProvider=${selectedOption}&userId=${generateSessionId()}`;
	const response = await fetch(url);
	await checkForRequestErrors(response);
	return await response.json();
}

export function Jokes() {
	const { selectedOption } = useModelOption();
	const [jokeResponse, setJokeResponse] = useState<AiExtendedResponse | null>(
		null,
	);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	const generateJoke = () => {
		setIsLoading(true);
		fetchAiJoke(selectedOption!.id)
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
			<Button
				onClick={generateJoke}
				disableElevation
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
			{jokeResponse ? <AiResponseComponent response={jokeResponse} /> : null}
		</Stack>
	);
}
