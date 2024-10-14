import {useState} from "react";
import {Box, Card, Icon, Stack, Typography} from "@mui/material";
import {ChatInput} from "./ChatInput.tsx";
import {DEFAULT_WIDTH, HOST, MODEL_PROVIDER} from "../App.tsx";
import ReactMarkdown from 'react-markdown';
import {QuestionMark} from "@mui/icons-material";


async function fetchChat(prompt: string) {
    const url = `${HOST}/chat?model=${MODEL_PROVIDER}&prompt=${prompt}`
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
        <Box sx={{textAlign: 'left', width: DEFAULT_WIDTH}}>
            <Typography variant='h5' gutterBottom>
                Tech support
            </Typography>
            <Box>
                {chats.map((chat, index) => (
                    <Stack key={index} spacing={1} sx={{paddingY: 2}}>
                        <ChatPrompt prompt={chat.title}/>
                        <ChatAnswer answer={chat.body}/>
                    </Stack>
                ))}
            </Box>
            <ChatInput onSendMessage={handleSendMessage} isLoading={loading}/>
        </Box>
    );
}

function ChatPrompt(props: { prompt: string }) {
    return (
        <Card variant='outlined' sx={{padding: 1, backgroundColor: '#f0f8f8'}}>
            <Stack direction='row' alignItems='center'>
                <QuestionMark sx={{scale: 0.9}}/>
                <Typography variant='h6'>{props.prompt}</Typography>
            </Stack>
        </Card>
    )
}


function ChatAnswer(props: { answer: string }) {
    return (
        <Card variant='outlined' sx={{padding: 1}}>
            <Stack>
                <Icon>
                    <img src="/public/the-joker.svg" style={{height: '100%'}} alt="Your SVG"/>
                </Icon>
                <ReactMarkdown>{props.answer}</ReactMarkdown>
            </Stack>
        </Card>
    )
}
