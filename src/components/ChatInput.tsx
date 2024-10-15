import {
	Box,
	CircularProgress,
	IconButton,
	InputAdornment,
	OutlinedInput,
} from "@mui/material";
import { useState } from "react";
import { SendRounded } from "@mui/icons-material";

interface ChatInputProps {
	onSendMessage: (message: string) => void;
	isLoading: boolean;
}

export function ChatInput(props: ChatInputProps) {
	const [message, setMessage] = useState("");

	function onSend() {
		console.log("asdf");
		if (message.trim()) {
			props.onSendMessage(message);
			setMessage("");
		}
	}

	return (
		<Box sx={{ display: "flex", gap: 1 }}>
			<OutlinedInput
				fullWidth
				multiline
				value={message}
				onChange={(c) => {
					setMessage(c.target.value);
				}}
				placeholder="Ask a technical question..."
				endAdornment={
					<InputAdornment position="end">
						<IconButton onClick={onSend} disabled={props.isLoading}>
							{props.isLoading ? (
								<CircularProgress size={24} />
							) : (
								<SendRounded color="primary" />
							)}
						</IconButton>
					</InputAdornment>
				}
			/>
		</Box>
	);
}
