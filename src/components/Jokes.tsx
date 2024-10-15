import { useState } from "react";
import { Button, CircularProgress, Stack } from "@mui/material";
import { DEFAULT_WIDTH } from "../App.tsx";
import { RefreshOutlined } from "@mui/icons-material";
import { AiExtendedResponse } from "../models/AiResponse.tsx";
import { AiResponseComponent } from "./AiPrompt.tsx";

async function fetchAiJoke() {
	const baseUrl = import.meta.env.VITE_BASE_URL;
	const modelProvider = import.meta.env.VITE_MODEL_PROVIDER;
	const url = `${baseUrl}/joke?modelProvider=${modelProvider}`;
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}, url: ${url}`);
	}
	return await response.json();
}

export function Jokes() {
	const [jokeResponse, setJokeResponse] = useState<AiExtendedResponse | null>(
		null,
	);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const generateJoke = () => {
		setIsLoading(true);
		fetchAiJoke()
			.then((result) => {
				setJokeResponse(result);
				setIsLoading(false);
			})
			.catch((e) => {
				setError(e.message);
				setIsLoading(false);
			});
	};

	if (error) return <div>{error}</div>;

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
