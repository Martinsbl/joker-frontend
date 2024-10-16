import { Card, Stack } from "@mui/material";
import type { AiExtendedResponse } from "../models/AiResponse.tsx";
import { LabeledText } from "./LabeledText.tsx";

export function AiResponseData(props: { response: AiExtendedResponse }) {
	const response = props.response;
	const metadata = response.aiResponse.metadata;

	return (
		<Card variant="outlined" sx={{ padding: 1, backgroundColor: "#f8f0f0" }}>
			<Stack>
				<Stack direction="row" spacing={2}>
					<LabeledText label="TokenCount:" text={""} variant="caption" />
					<LabeledText
						label="Input:"
						text={response.aiResponse.tokenUsage.inputTokenCount}
						variant="caption"
					/>
					<LabeledText
						label="Output:"
						text={response.aiResponse.tokenUsage.outputTokenCount}
						variant="caption"
					/>
					<LabeledText
						label="Total:"
						text={response.aiResponse.tokenUsage.totalTokenCount}
						variant="caption"
					/>
				</Stack>
				<LabeledText
					label="TimeStamp:"
					text={formatEpochTimestamp(response.timeStamp)}
					variant="caption"
				/>
				<LabeledText
					label="FinishReason:"
					text={response.aiResponse.finishReason}
					variant="caption"
				/>
				<LabeledText
					label="Model:"
					text={response.chatLanguageModel}
					variant="caption"
				/>
				{Array.from(metadata).map(([key, value]) => (
					<LabeledText label={key} text={value} variant="caption" />
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
