import { useContext, useEffect } from "react";
import { fetchApiInfo } from "../components/VersionNumber.tsx";
import type { ApiInfo } from "../models/ApiInfo.tsx";
import { ModelOptionContext } from "./ModelUtils.tsx";

export const useModelOption = () => {
	const context = useContext(ModelOptionContext);
	if (context === undefined) {
		throw new Error("useOption must be used within an OptionProvider");
	}
	return context;
};

export const useModelOptionsFetch = () => {
	const { setOptions, setSelectedOption } = useModelOption();

	useEffect(() => {
		const fetchOptions = async () => {
			try {
				const response: ApiInfo = await fetchApiInfo();
				const formattedOptions = response.modelConfigs.map((item) => ({
					id: item.modelProvider.id,
					label: item.modelProvider.friendlyName,
					text: item.supportedModels[0],
				}));
				setOptions(formattedOptions);

				// Set default option
				if (formattedOptions.length > 0) {
					setSelectedOption(formattedOptions[0]);
				}
			} catch (error) {
				console.error("Error fetching options:", error);
			}
		};

		fetchOptions();
	}, [setOptions, setSelectedOption]);
};
