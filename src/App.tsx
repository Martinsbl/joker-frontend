import "./App.css";
import {Box, Divider, Stack} from "@mui/material";
import {ChatInterface} from "./components/ChatInterface.tsx";
import {Jokes} from "./components/Jokes.tsx";
import {ModelProviderChips} from "./components/ModelProviderChips.tsx";
import {checkForRequestErrors} from "./errors/ApiErrorClass.tsx";
import {useModelOptionsFetch} from "./utils/ModelFunctions.tsx";
import {VersionNumber} from "./components/VersionNumber.tsx";

export const DEFAULT_WIDTH = 800;

export async function fetchApiInfo() {
	const baseUrl = import.meta.env.VITE_BASE_URL;
	const url = `${baseUrl}/info`;
	const response = await fetch(url);
	await checkForRequestErrors(response);
	return await response.json();
}

function App() {

	useModelOptionsFetch();

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				alignItems: "center",
				height: "90vh",
			}}
		>
			<Stack spacing={10} divider={<Divider orientation="horizontal" />}>
				<ModelProviderChips/>
				<Jokes />
				<ChatInterface />
			</Stack>
			<VersionNumber/>
		</Box>
	);
}

export default App;
