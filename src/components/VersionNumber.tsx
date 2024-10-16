import { useEffect, useState } from "react";
import { checkForRequestErrors } from "../errors/ApiErrorClass.tsx";
import type { ApiInfo } from "../models/ApiInfo.tsx";
import { ErrorView } from "./ErrorComponent.tsx";
import { LabeledText } from "./LabeledText.tsx";

export const DEFAULT_WIDTH = 800;

export async function fetchApiInfo() {
	const baseUrl = import.meta.env.VITE_BASE_URL;
	const url = `${baseUrl}/info`;
	const response = await fetch(url);
	await checkForRequestErrors(response);
	return await response.json();
}

export function VersionNumber() {
	const [apiInfo, setApiInfo] = useState<ApiInfo | null>(null);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		fetchApiInfo()
			.then((result) => {
				setApiInfo(result);
			})
			.catch((e) => {
				setError(e);
			});
	}, []);

	if (error) return <ErrorView e={error} />;

	return (
		<LabeledText label={"API Version:"} text={apiInfo?.version ?? "null"} />
	);
}
