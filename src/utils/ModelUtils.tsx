import { createContext } from "react";

export interface ModelOption {
	id: string;
	label: string;
	text: string;
}

interface ModelOptionContextType {
	selectedOption: ModelOption | null;
	setSelectedOption: (option: ModelOption | null) => void;
	options: ModelOption[];
	setOptions: (options: ModelOption[]) => void;
}

export const ModelOptionContext = createContext<
	ModelOptionContextType | undefined
>(undefined);
