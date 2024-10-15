import { Card, Stack, Typography } from "@mui/material";
import { AiExtendedResponse } from "../models/AiResponse.tsx";
import ReactMarkdown from "react-markdown";
import { AiResponseData } from "./AiResponseData.tsx";

export function AiResponseComponent(props: { response: AiExtendedResponse }) {
	return (
		<Stack spacing={1} sx={{ textAlign: "left" }}>
			<ChatPrompt prompt={props.response.prompt} />
			<ChatAnswer response={props.response} />
		</Stack>
	);
}

function ChatPrompt(props: { prompt: string }) {
	return (
		<Card variant="outlined" sx={{ padding: 1, backgroundColor: "#f0f8f8" }}>
			<Stack direction="row" alignItems="center">
				<Typography variant="h6">{props.prompt}</Typography>
			</Stack>
		</Card>
	);
}

function ChatAnswer(props: { response: AiExtendedResponse }) {
	return (
		<Card variant="outlined" sx={{ padding: 1 }}>
			<Stack>
				<ReactMarkdown>{props.response.aiResponse.content.text}</ReactMarkdown>
				<AiResponseData response={props.response} />
			</Stack>
		</Card>
	);
}
