import { Stack, Typography, type TypographyProps } from "@mui/material";

interface LabeledTextProps {
	label: string;
	text: string;
	variant?: TypographyProps["variant"];
}

export function LabeledText({
	label,
	text,
	variant = "body1",
}: LabeledTextProps) {
	return (
		<Stack direction="row" spacing={1}>
			<Typography variant={variant} fontWeight="bold">
				{label}
			</Typography>
			<Typography variant={variant}>{text}</Typography>
		</Stack>
	);
}
