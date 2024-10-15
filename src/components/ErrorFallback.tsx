import {Stack, Typography} from "@mui/material";
import {WarningOutlined} from "@mui/icons-material";
import {ApiErrorClass} from "./Jokes.tsx";

export function ErrorView(props: { e: Error }) {

    const error = props.e
    let message = error.message ?? "An unknown error occurred"
    let exceptionName: string | null = null
    let stackTrace: string | null = null

    if (error instanceof ApiErrorClass) {
        message = error.message
        exceptionName = error.exceptionName
        stackTrace = error.stackTrace
    }

    return (
        <Stack direction='column' alignItems='center' spacing={2}>
            <WarningOutlined fontSize='large' color='error'/>
            {exceptionName ?
                <Typography>{exceptionName}</Typography>
                : null}
            <Typography>{message}</Typography>
            {stackTrace ?
                <Stack sx={{width: 600}} textAlign='left'>
                    <Typography>{stackTrace}</Typography>
                </Stack>
                : null}
        </Stack>
    );
}
