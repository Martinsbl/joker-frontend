import { Stack, Typography } from "@mui/material";
import { WarningOutlined } from "@mui/icons-material";
import { ExpandableText } from "./ExpandableText.tsx";
import {
	ApiErrorClass,
	ApiErrorResponse,
	RequestErrorClass,
	RequestErrorResponse,
} from "../errors/ApiErrorClass.tsx";
import React from "react";

export function ErrorView(props: { e: Error }) {
	const error = props.e;
	const message = error.message ?? "An unknown error occurred";
	let apiError: ApiErrorResponse | null = null;
	let requestError: RequestErrorResponse | null = null;

	let node: React.ReactNode;

	if (error instanceof ApiErrorClass) {
		apiError = error.errorData;
		node = <ApiError error={apiError} />;
	} else if (error instanceof RequestErrorClass) {
		requestError = error.errorData;
		node = <RequestError error={requestError} />;
	} else {
		node = <Typography>{message}</Typography>;
	}

	return (
		<Stack direction="column" alignItems="center" spacing={2}>
			<WarningOutlined fontSize="large" color="error" />
			{node}
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
			<Stack sx={{ width: 800 }} textAlign="left">
				<ExpandableText
					summary={exceptionName ?? "Exception"}
					text={stackTrace}
				/>
			</Stack>
		</Stack>
	);
}

function RequestError(props: { error: RequestErrorResponse }) {
	const { status, message, url } = props.error;

	return (
		<Stack direction="column" spacing={1}>
			<Typography variant="h5">
				{`${status.value} ${status.description}`}
			</Typography>
			<Typography variant="body1">{message}</Typography>
			<Typography variant="body2">{url}</Typography>
		</Stack>
	);
}
