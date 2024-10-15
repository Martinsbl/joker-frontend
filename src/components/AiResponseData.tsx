import { AiExtendedResponse } from "../models/AiResponse.tsx";
import { Card, Stack, Typography } from "@mui/material";

export function AiResponseData(props: { response: AiExtendedResponse }) {
	const response = props.response;
	const metadata = response.aiResponse.metadata;

	return (
		<Card variant="outlined" sx={{ padding: 1, backgroundColor: "#f8f0f0" }}>
			<Stack>
				<Stack direction="row" spacing={2}>
					<LabeledText label="TokenCount:" text={""} />
					<LabeledText
						label="Input:"
						text={response.aiResponse.tokenUsage.inputTokenCount}
					/>
					<LabeledText
						label="Output:"
						text={response.aiResponse.tokenUsage.outputTokenCount}
					/>
					<LabeledText
						label="Total:"
						text={response.aiResponse.tokenUsage.totalTokenCount}
					/>
				</Stack>
				<LabeledText
					label="TimeStamp:"
					text={formatEpochTimestamp(response.timeStamp)}
				/>
				<LabeledText
					label="FinishReason:"
					text={response.aiResponse.finishReason}
				/>
				<LabeledText label="Model:" text={response.chatLanguageModel} />
				{Array.from(metadata).map(([key, value]) => (
					<LabeledText label={key} text={value} />
				))}
			</Stack>
		</Card>
	);
}

function formatEpochTimestamp(epochTimestamp: number): string {
	const date = new Date(epochTimestamp); // Convert seconds to milliseconds

	const year = date.getFullYear();
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const day = date.getDate().toString().padStart(2, "0");
	const hours = date.getHours().toString().padStart(2, "0");
	const minutes = date.getMinutes().toString().padStart(2, "0");
	const seconds = date.getSeconds().toString().padStart(2, "0");

	return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;
}

interface LabeledTextProps {
	label: string;
	text: string;
}

function LabeledText(props: LabeledTextProps) {
	return (
		<Stack direction="row" spacing={1}>
			<Typography variant="caption" fontWeight="bold">
				{props.label}
			</Typography>
			<Typography variant="caption">{props.text}</Typography>
		</Stack>
	);
}
