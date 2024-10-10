import {useEffect, useState} from 'react'
import './App.css'
import {Box, Stack, Typography} from "@mui/material"


async function fetchAiJoke() {
    console.log("fetchAiAnswer()")
    // const url = "http://0.0.0.0/joke?model=openai"
    const url = "http://20.251.81.7/joke?model=openai"
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, url: ${url}`)
    }
    return await response.json()
}

async function fetchApiInfo() {
    const url = "http://0.0.0.0/version"
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

interface ApiInfo {
    version: string,
}

function App() {
    const [data, setData] = useState<AiResponse | null>(null)
    const [apiInfo, setApiInfo] = useState<ApiInfo | null>(null)
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    console.log("before useEffect")
    useEffect(() => {
        fetchAiJoke()
            .then((result) => {
                setData(result)
                setLoading(false)
            })
            .catch((e) => {
                setError(e.message)
                setLoading(false)
            })
    }, []);

    useEffect(() => {
        fetchApiInfo()
            .then((result) => {
                setApiInfo(result)
            })
            .catch((e) => {
                setError(e.message)
            })
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!data) return <div>No data</div>;

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
                    <Typography variant={"h6"} style={{whiteSpace: 'pre-line'}}>{data.title}</Typography>
                    <Typography style={{whiteSpace: 'pre-line'}}>{data.body}</Typography>
                </Stack>
            </Box>
            <Typography>{`API v${apiInfo?.version}`}</Typography>
        </Box>
    )
}

export default App
