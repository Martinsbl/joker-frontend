import {Box, Button, TextField} from "@mui/material";
import * as React from "react";
import {useState} from "react";


interface ChatInputProps {
    onSendMessage: (message: string) => void;
}

export function ChatInput(props: ChatInputProps) {

    const [message, setMessage] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        if (message.trim()) {
            props.onSendMessage(message)
            setMessage('')
        }
    }


    return (
        <Box component="form" onSubmit={handleSubmit} sx={{display: 'flex', gap: 1}}>
            <TextField
                fullWidth
                multiline
                variant="outlined"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary">
                Send
            </Button>
        </Box>
    )
}
