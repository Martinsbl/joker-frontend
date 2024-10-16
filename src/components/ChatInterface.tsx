import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { DEFAULT_WIDTH } from "../App.tsx";
import { generateSessionId } from "../Utils.ts";
import { checkForRequestErrors } from "../errors/ApiErrorClass.tsx";
import type { AiExtendedResponse } from "../models/AiResponse.tsx";
import { useModelOption } from "../utils/ModelFunctions.tsx";
import { AiResponseComponent } from "./AiPrompt.tsx";
import { ChatInput } from "./ChatInput.tsx";
import { ErrorView } from "./ErrorComponent.tsx";

async function fetchChat(selectedOption: string | undefined, prompt: string) {
	const baseUrl = import.meta.env.VITE_BASE_URL;
	const url = `${baseUrl}/chat?modelProvider=${selectedOption}&userId=${generateSessionId()}&prompt=${prompt}`;
	const response = await fetch(url);
	await checkForRequestErrors(response);
	return await response.json();
}

export function ChatInterface() {
	const { selectedOption } = useModelOption();

	const [chats, setChats] = useState<AiExtendedResponse[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	const handleSendMessage = (message: string) => {
		setLoading(true);

		fetchChat(selectedOption?.id, message)
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
				Chat bot
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
