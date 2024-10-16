import { type ReactNode, useState } from "react";
import { type ModelOption, ModelOptionContext } from "../utils/ModelUtils.tsx";

export const ModelOptionProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [selectedOption, setSelectedOption] = useState<ModelOption | null>(
		null,
	);
	const [options, setOptions] = useState<ModelOption[]>([]);

	return (
		<ModelOptionContext.Provider
			value={{ selectedOption, setSelectedOption, options, setOptions }}
		>
			{children}
		</ModelOptionContext.Provider>
	);
};
