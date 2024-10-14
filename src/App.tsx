import {useEffect, useState} from 'react'
import './App.css'
import {Box, Typography} from "@mui/material"
import {ChatInterface} from "./components/ChatInterface.tsx";
import {Jokes} from "./components/Jokes.tsx";


const host = "http://20.251.75.22/api"
// const host = "http://0.0.0.0"

async function fetchApiInfo() {
    const url = `${host}/version`
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, url: ${url}`)
    }
    return await response.json()
}

interface ApiInfo {
    version: string,
}


export const HOST = "http://20.251.75.22/api"
// export const HOST = "http://0.0.0.0"

function App() {
    const [apiInfo, setApiInfo] = useState<ApiInfo | null>(null)
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchApiInfo()
            .then((result) => {
                setApiInfo(result)
            })
            .catch((e) => {
                setError(e.message)
            })
    }, []);

    if (error) return <div>{error}</div>;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: '90vh',
            }}>
            <Jokes/>
            <ChatInterface/>
            <Typography>{`API v${apiInfo?.version}`}</Typography>
        </Box>
    )
}

export default App
