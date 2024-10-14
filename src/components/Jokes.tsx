import {useEffect, useState} from 'react'
import {Box, Stack, Typography} from "@mui/material"
import {HOST} from "../App.tsx";


async function fetchAiJoke() {
    const url = `${HOST}/joke?model=openai`
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
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchAiJoke()
            .then((result) => {
                setJoke(result)
                setLoading(false)
            })
            .catch((e) => {
                setError(e.message)
                setLoading(false)
            })
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!joke) return <div>No data</div>;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '90vh',
            }}>
            <Box flexGrow={1} display="flex" alignItems="center">
                <Stack>
                    <Typography variant={"h6"} style={{whiteSpace: 'pre-line'}}>{joke.title}</Typography>
                    <Typography style={{whiteSpace: 'pre-line'}}>{joke.body}</Typography>
                </Stack>
            </Box>
        </Box>
    )
}
