import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { ChatInput } from "./ChatInput.tsx";
import { DEFAULT_WIDTH } from "../App.tsx";
import { AiExtendedResponse } from "../models/AiResponse.tsx";
import { AiResponseComponent } from "./AiPrompt.tsx";
import { generateSessionId } from "../Utils.ts";
import { checkForRequestErrors } from "../errors/ApiErrorClass.tsx";
import { ErrorView } from "./ErrorComponent.tsx";

async function fetchChat(prompt: string) {
	const baseUrl = import.meta.env.VITE_BASE_URL;
	const modelProvider = import.meta.env.VITE_MODEL_PROVIDER;
	const url = `${baseUrl}/chat?modelProvider=${modelProvider}&userId=${generateSessionId()}&prompt=${prompt}`;
	const response = await fetch(url);
	await checkForRequestErrors(response);
	return await response.json();
}

export function ChatInterface() {
	const [chats, setChats] = useState<AiExtendedResponse[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	const handleSendMessage = (message: string) => {
		setLoading(true);

		fetchChat(message)
			.then((result) => {
				setChats([...chats, result]);
				setLoading(false);
			})
			.catch((e) => {
				setError(e);
				setLoading(false);
			});
	};

	if (error) return <ErrorView e={error} />;

	return (
		<Box sx={{ textAlign: "left", width: DEFAULT_WIDTH }}>
			<Typography variant="h5" gutterBottom>
				Tech support
			</Typography>
			<Box>
				{chats.map((chat, index) => (
					<Stack key={index} spacing={1} sx={{ paddingY: 2 }}>
						<AiResponseComponent response={chat} />
					</Stack>
				))}
			</Box>
			<ChatInput onSendMessage={handleSendMessage} isLoading={loading} />
		</Box>
	);
}
