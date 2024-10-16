import "./App.css";
import { Divider, Stack } from "@mui/material";
import { ChatInterface } from "./components/ChatInterface.tsx";
import { Jokes } from "./components/Jokes.tsx";
import { Layout } from "./components/Layout.tsx";
import { useModelOptionsFetch } from "./utils/ModelFunctions.tsx";

export const DEFAULT_WIDTH = 800;

function App() {
	useModelOptionsFetch();

	return (
		<Layout>
			<Divider orientation="horizontal" />
			<Stack
				spacing={4}
				divider={<Divider orientation="horizontal" />}
				sx={{ paddingTop: 3 }}
			>
				<Jokes />
				<ChatInterface />
			</Stack>
		</Layout>
	);
}

export default App;
