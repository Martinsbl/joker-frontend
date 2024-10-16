import { useState } from "react";
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	styled,
	Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

interface ExpandableTextProps {
	summary: string;
	text: string;
}

export function ExpandableText(props: ExpandableTextProps) {
	const { summary, text } = props;
	const [expanded, setExpanded] = useState(false);

	const handleToggle = () => {
		setExpanded(!expanded);
	};

	return (
		<Accordion variant="outlined" expanded={expanded} onChange={handleToggle}>
			<AccordionSummary
				expandIcon={<ExpandMore />}
				aria-controls="panel-content"
				id="panel-header"
			>
				<Typography>{summary}</Typography>
			</AccordionSummary>
			<AccordionDetails
				sx={{
					overflow: "auto",
				}}
			>
				<LogOutput>{text}</LogOutput>
			</AccordionDetails>
		</Accordion>
	);
}

const LogOutput = styled(Typography)(({ theme }) => ({
	fontFamily: "monospace",
	whiteSpace: "pre-wrap",
	padding: theme.spacing(2),
	borderRadius: theme.shape.borderRadius,
	overflow: "auto",
	maxHeight: "300px", // Adjust as needed
}));
