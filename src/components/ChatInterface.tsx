import {useState} from "react";
import {Box, Paper, Typography} from "@mui/material";
import {ChatInput} from "./ChatInput.tsx";

export function ChatInterface() {

    const [messages, setMessages] = useState<string[]>([])

    const handleSendMessage = (message: string) => {
        setMessages([...messages, message])
        console.log(message)
    }

    return (
        <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
            <Typography variant='h5' gutterBottom>
                Tech support
            </Typography>
            <Box sx={{flexGrow: 1, overflowY: 'auto', mb: 2}}>
                {messages.map((message, index) => (
                    <Typography key={index}>{message}</Typography>
                ))}
            </Box>
            <ChatInput onSendMessage={handleSendMessage}/>
        </Paper>
    )
}
