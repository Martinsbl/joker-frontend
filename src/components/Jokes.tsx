import {useState} from 'react'
import {Box, Button, CircularProgress, Stack, Typography} from "@mui/material"
import {DEFAULT_WIDTH, HOST, MODEL_PROVIDER} from "../App.tsx";
import {RefreshOutlined} from "@mui/icons-material";


async function fetchAiJoke() {
    const url = `${HOST}/joke?model=${MODEL_PROVIDER}`
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, url: ${url}`)
    }
    return await response.json()
}

interface AiResponse {
    title: string,
    body: string,
}

export function Jokes() {
    const [joke, setJoke] = useState<AiResponse | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const generateJoke = () => {
        setIsLoading(true)
        fetchAiJoke()
            .then((result) => {
                setJoke(result)
                setIsLoading(false)
            })
            .catch((e) => {
                setError(e.message)
                setIsLoading(false)
            })
    }

    if (error) return <div>{error}</div>;

    return (
        <Box
            sx={{
                width: DEFAULT_WIDTH,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
            {joke ? <Joke title={joke.title} body={joke.body}/> : null}
            <Button
                onClick={generateJoke}
                variant="contained"
                disabled={isLoading}
                endIcon={
                    isLoading ? <CircularProgress size={16} sx={{color: 'white'}}/> : <RefreshOutlined/>
                }
                sx={{width: 200}}
            >
                Generate joke
            </Button>
        </Box>
    )
}

function Joke(props: { title: string, body: string; }) {
    return (
        <Stack spacing={2} sx={{textAlign: 'left', paddingY: 2}}>
            <Typography variant='h5' style={{whiteSpace: 'pre-line'}}>{props.title}</Typography>
            <Typography style={{whiteSpace: 'pre-line'}}>{props.body}</Typography>
        </Stack>
    )
}
