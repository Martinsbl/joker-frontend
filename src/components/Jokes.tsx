import { useState } from "react";
import { Button, CircularProgress, Stack } from "@mui/material";
import { DEFAULT_WIDTH } from "../App.tsx";
import { RefreshOutlined } from "@mui/icons-material";
import { AiExtendedResponse } from "../models/AiResponse.tsx";
import { AiResponseComponent } from "./AiPrompt.tsx";
import { generateSessionId } from "../Utils.ts";
import { ErrorView } from "./ErrorFallback.tsx";

interface HttpStatus {
	value: number;
	description: string;
}

export interface ApiErrorResponse {
	status: HttpStatus;
	message: string;
	exceptionName: string;
	url: string;
	stackTrace: string;
}

export class ApiErrorClass extends Error {
	errorData: ApiErrorResponse;

	constructor(message: string, apiErrorResponse: ApiErrorResponse) {
		super(message);
		this.name = "APIError";
		this.errorData = apiErrorResponse;
	}
}

async function fetchAiJoke() {
	const baseUrl = import.meta.env.VITE_BASE_URL;
	const modelProvider = import.meta.env.VITE_MODEL_PROVIDER;
	const url = `${baseUrl}/joke?modelPgrovider=${modelProvider}&userId=${generateSessionId()}`;
	const response = await fetch(url);
	if (!response.ok) {
		const asdf: ApiErrorResponse = await response.json();
		console.error(asdf.exceptionName);
		throw new ApiErrorClass(asdf.message, asdf);
	}
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
