import {useState} from "react";
import {Box, Card, Stack, Typography} from "@mui/material";
import {ChatInput} from "./ChatInput.tsx";
import {HOST} from "../App.tsx";
import ReactMarkdown from 'react-markdown';


async function fetchChat(prompt: string) {
    const url = `${HOST}/chat?model=openai&prompt=${prompt}`
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

export function ChatInterface() {

    const [chats, setChats] = useState<AiResponse[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSendMessage = (message: string) => {
        setLoading(true)

        fetchChat(message)
            .then((result) => {
                setChats([...chats, result])
                setLoading(false)
            })
            .catch((e) => {
                setError(e.message)
                setLoading(false)
            })
    }

    if (error) return <div>{error}</div>

    return (
        <Box sx={{textAlign: 'left', width: 800}}>
            <Typography variant='h5' gutterBottom>
                Tech support
            </Typography>
            <Box sx={{flexGrow: 1, overflowY: 'auto', mb: 2}}>
                {chats.map((chat, index) => (
                    <Stack>
                        <Card variant='outlined' sx={{backgroundColor: '#f0f8f8'}}>
                            <Typography variant='h6'>{chat.title}</Typography>
                        </Card>
                        <ReactMarkdown key={index}>
                            {chat.body}
                        </ReactMarkdown>
                    </Stack>
                ))}
            </Box>
            <ChatInput onSendMessage={handleSendMessage} isLoading={loading}/>
        </Box>
    );
}
