import { Chip, Stack } from "@mui/material";
import { useModelOption } from "../utils/ModelFunctions.tsx";
import { LabeledText } from "./LabeledText.tsx";

export function ModelProviderChips() {
	const { options, selectedOption, setSelectedOption } = useModelOption();

	return (
		<Stack direction="row" spacing={1} alignItems="center">
			{options.map((option) => (
				<Chip
					key={option.id}
					label={
						<LabeledText
							label={option.label}
							text={option.text}
							variant="body2"
						/>
					}
					onClick={() => setSelectedOption(option)}
					color={selectedOption?.id === option.id ? "primary" : "default"}
					variant={selectedOption?.id === option.id ? "filled" : "outlined"}
				/>
			))}
		</Stack>
	);
}
