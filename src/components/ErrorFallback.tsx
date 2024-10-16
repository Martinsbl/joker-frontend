import { Stack, Typography } from "@mui/material";
import { WarningOutlined } from "@mui/icons-material";
import { ApiErrorClass, ApiErrorResponse } from "./Jokes.tsx";
import { ExpandableText } from "./ExpandableText.tsx";

export function ErrorView(props: { e: Error }) {
	const error = props.e;
	const message = error.message ?? "An unknown error occurred";
	let apiError: ApiErrorResponse | null = null;

	if (error instanceof ApiErrorClass) {
		apiError = error.errorData;
	}

	return (
		<Stack direction="column" alignItems="center" spacing={2}>
			<WarningOutlined fontSize="large" color="error" />
			{apiError ? (
				<ApiError error={apiError} />
			) : (
				<Typography>{message}</Typography>
			)}
		</Stack>
	);
}

function ApiError(props: { error: ApiErrorResponse }) {
	const { status, message, exceptionName, url, stackTrace } = props.error;

	return (
		<Stack direction="column" spacing={1}>
			<Typography variant="h5">
				{`${status.value} ${status.description}`}
			</Typography>
			<Typography variant="body1">{message}</Typography>
			<Typography variant="body2">{url}</Typography>
			<Stack sx={{ width: 600 }} textAlign="left">
				<ExpandableText
					summary={exceptionName ?? "Exception"}
					text={stackTrace}
				/>
			</Stack>
		</Stack>
	);
}
