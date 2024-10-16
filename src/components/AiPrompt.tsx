import { ContentCopyOutlined } from "@mui/icons-material";
import { Card, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import type { AiExtendedResponse } from "../models/AiResponse.tsx";
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
				<CopyableText text={props.prompt} />
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

interface CopyableTextProps {
	text: string;
}

function CopyableText(props: CopyableTextProps) {
	const [copied, setCopied] = useState(false);

	const handleCopy = async () => {
		try {
			await navigator.clipboard.writeText(props.text);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error("Failed to copy text", err);
		}
	};

	return (
		<Stack
			direction="row"
			justifyContent="space-between"
			sx={{ width: "100%" }}
		>
			<Typography variant="h6">{props.text}</Typography>
			<Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
				<IconButton onClick={handleCopy} size="small">
					<ContentCopyOutlined fontSize="inherit" />
				</IconButton>
			</Tooltip>
		</Stack>
	);
}
